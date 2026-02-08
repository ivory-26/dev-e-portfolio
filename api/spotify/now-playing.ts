interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

// Environment variables (configure these in Vercel dashboard, NOT client-side)
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Simple in-memory cache for access token during serverless execution lifetime
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0; // epoch ms

interface SpotifyTrackData {
  playing: boolean;
  title?: string;
  artists?: string;
  album?: string;
  artwork?: string;
  progressMs?: number;
  durationMs?: number;
  url?: string;
  playedAt?: string;
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiresAt - 60_000) { // reuse if >60s remaining
    return cachedAccessToken;
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error('MISSING_SPOTIFY_CREDS');
  }

  const basicAuth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const form = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: SPOTIFY_REFRESH_TOKEN
  });

  const tokenResp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: form.toString()
  });

  if (!tokenResp.ok) {
    const text = await tokenResp.text();
    throw new Error(`TOKEN_FAIL:${tokenResp.status}:${text}`);
  }

  const tokenJson = await tokenResp.json() as { access_token: string; expires_in: number };
  cachedAccessToken = tokenJson.access_token;
  tokenExpiresAt = Date.now() + tokenJson.expires_in * 1000;
  return cachedAccessToken;
}

async function getLastPlayed(accessToken: string): Promise<SpotifyTrackData | null> {
  const recentResp = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  if (!recentResp.ok) {
    return null;
  }

  const recentJson = await recentResp.json();
  const recentItem = Array.isArray(recentJson?.items) ? recentJson.items[0] : null;
  const track = recentItem?.track;

  if (!track) {
    return null;
  }

  const artists = Array.isArray(track?.artists)
    ? track.artists.map((artist: any) => artist.name).join(', ')
    : undefined;

  return {
    playing: false,
    title: track?.name,
    artists,
    album: track?.album?.name,
    artwork: track?.album?.images?.[0]?.url,
    url: track?.external_urls?.spotify,
    playedAt: recentItem?.played_at
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS (adjust origin if you need to lock this down)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accessToken = await getAccessToken();
    const playingResp = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (playingResp.status === 204 || playingResp.status === 202) {
      const lastPlayed = await getLastPlayed(accessToken);
      return res.status(200).json(lastPlayed ?? { playing: false });
    }

    if (!playingResp.ok) {
      const text = await playingResp.text();
      throw new Error(`PLAYBACK_FAIL:${playingResp.status}:${text}`);
    }

    const json = await playingResp.json();
    // Safely extract fields
    const item = json.item;
    const isPlaying = json.is_playing && !!item;

    if (!isPlaying) {
      const lastPlayed = await getLastPlayed(accessToken);
      return res.status(200).json(lastPlayed ?? { playing: false });
    }

    const artists = Array.isArray(item?.artists) ? item.artists.map((a: any) => a.name).join(', ') : undefined;
    const data: SpotifyTrackData = {
      playing: true,
      title: item?.name,
      artists,
      album: item?.album?.name,
      artwork: item?.album?.images?.[0]?.url,
      progressMs: json.progress_ms,
      durationMs: item?.duration_ms,
      url: item?.external_urls?.spotify
    };

    return res.status(200).json(data);
  } catch (err: any) {
    if (err?.message === 'MISSING_SPOTIFY_CREDS') {
      return res.status(200).json({ playing: false, error: 'Spotify credentials not configured' });
    }
    console.error('Spotify API error:', err);
    return res.status(500).json({ playing: false, error: 'Failed to fetch Spotify playback' });
  }
}

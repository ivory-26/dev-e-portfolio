import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

interface NowPlayingResponse {
  playing: boolean;
  title?: string;
  artists?: string;
  album?: string;
  artwork?: string;
  progressMs?: number;
  durationMs?: number;
  url?: string;
  error?: string; // present when credentials missing or API fails gracefully
}

const POLL_INTERVAL = 35000;

export const SpotifyWidget: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchNowPlaying = async (showLoader: boolean) => {
      if (showLoader) {
        setLoading(true);
      }

      try {
        const response = await fetch('/api/spotify/now-playing');
        if (!response.ok) {
          throw new Error(`Spotify API failed: ${response.status}`);
        }

        const data = (await response.json()) as NowPlayingResponse;
        if (!active) return;
        setNowPlaying(data);
      } catch (error) {
        if (!active) return;
        console.error('Error fetching now playing:', error);
        setNowPlaying(null);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    fetchNowPlaying(true);
    const interval = setInterval(() => fetchNowPlaying(false), POLL_INTERVAL);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const playbackActive = Boolean(nowPlaying?.playing && nowPlaying?.title);
  const progressPercent = nowPlaying?.progressMs && nowPlaying?.durationMs
    ? Math.min(100, Math.max(0, (nowPlaying.progressMs / nowPlaying.durationMs) * 100))
    : 0;

  if (loading) {
    return (
      <div className="bg-surface border border-border p-6 rounded-lg flex items-center justify-center w-full h-full">
        <div className="text-sm text-secondary animate-pulse">Connecting to Spotify…</div>
      </div>
    );
  }

  // Credentials not configured case
  if (nowPlaying?.error === 'Spotify credentials not configured') {
    return (
      <div className="bg-surface border border-border p-6 rounded-lg flex items-center gap-4 w-full h-full">
        <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-md flex-shrink-0 flex items-center justify-center">
          <Music className="text-gray-600" size={24} />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-[#1DB954] uppercase tracking-wider mb-1">Spotify</div>
          <div className="text-primary font-semibold">Credentials not set</div>
          <div className="text-sm text-secondary">Add SPOTIFY_CLIENT_ID, SECRET & REFRESH_TOKEN.</div>
        </div>
      </div>
    );
  }

  if (!playbackActive) {
    return (
      <div className="bg-surface border border-border p-6 rounded-lg flex items-center gap-4 w-full h-full">
        <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-md flex-shrink-0 flex items-center justify-center">
          <Music className="text-gray-600" size={24} />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-[#1DB954] uppercase tracking-wider mb-1">Spotify</div>
          <div className="text-primary font-semibold">Not playing right now</div>
          <div className="text-sm text-secondary">Queue something up to see it here.</div>
        </div>
      </div>
    );
  }

  const content = (
    <div className="bg-surface border border-border p-6 rounded-lg flex items-center gap-4 group hover:border-[#1DB954]/50 transition-colors w-full h-full">
      <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
        {nowPlaying?.artwork ? (
          <img
            src={nowPlaying.artwork}
            alt={nowPlaying.album || 'Spotify artwork'}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <Music className="text-gray-600" size={24} />
        )}
        <div
          className="absolute bottom-0 left-0 h-1 bg-[#1DB954]"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-bold text-[#1DB954] uppercase tracking-wider flex items-center gap-2">
                <span>Spotify</span>
                <div className="flex items-end gap-[2px] h-3">
                    <span className="w-1 bg-[#1DB954] animate-[pulse_1s_ease-in-out_infinite] h-full"></span>
                    <span className="w-1 bg-[#1DB954] animate-[pulse_1.2s_ease-in-out_infinite] h-[60%]"></span>
                    <span className="w-1 bg-[#1DB954] animate-[pulse_0.8s_ease-in-out_infinite] h-[80%]"></span>
                </div>
            </div>
        </div>
        <div className="truncate font-bold text-primary text-lg">{nowPlaying?.title}</div>
        <div className="truncate text-sm text-secondary">{nowPlaying?.artists} • {nowPlaying?.album}</div>
      </div>
    </div>
  );

  if (nowPlaying?.url) {
    return (
      <a href={nowPlaying.url} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};
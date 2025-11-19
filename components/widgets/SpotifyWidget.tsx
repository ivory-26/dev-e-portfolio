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

  // Shared responsive card styling. Adjust min heights to keep grid stable.
  const baseCardClasses = "bg-surface border border-border rounded-lg w-full h-full min-h-[140px] px-4 py-4 sm:p-6";

  if (loading) {
    return (
      <div className={`${baseCardClasses} flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 sm:gap-4`}>
        <div className="flex items-center gap-2 text-xs font-bold text-[#1DB954] uppercase tracking-wider">
          <Music size={16} className="text-[#1DB954]" />
          <span>Spotify</span>
        </div>
        <div className="text-xs sm:text-sm text-secondary animate-pulse">Connecting…</div>
      </div>
    );
  }

  // Credentials not configured case
  if (nowPlaying?.error === 'Spotify credentials not configured') {
    return (
      <div className={`${baseCardClasses} flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4`}>
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-black rounded-md flex-shrink-0 flex items-center justify-center">
          <Music className="text-gray-600" size={24} />
        </div>
        <div className="flex-1 space-y-0.5 sm:space-y-1">
          <div className="text-[10px] sm:text-xs font-bold text-[#1DB954] uppercase tracking-wider">Spotify</div>
          <div className="text-primary font-semibold text-sm sm:text-base">Credentials not set</div>
          <div className="text-[11px] sm:text-sm text-secondary">Add SPOTIFY_CLIENT_ID, SECRET & REFRESH_TOKEN.</div>
        </div>
      </div>
    );
  }

  if (!playbackActive) {
    return (
      <div className={`${baseCardClasses} flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4`}>
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-black rounded-md flex-shrink-0 flex items-center justify-center">
          <Music className="text-gray-600" size={24} />
        </div>
        <div className="flex-1 space-y-0.5 sm:space-y-1">
          <div className="text-[10px] sm:text-xs font-bold text-[#1DB954] uppercase tracking-wider">Spotify</div>
          <div className="text-primary font-semibold text-sm sm:text-base">Not playing right now</div>
          <div className="text-[11px] sm:text-sm text-secondary">Queue something up to see it here.</div>
        </div>
      </div>
    );
  }

  const content = (
    <div className={`${baseCardClasses} flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 group hover:border-[#1DB954]/50 transition-colors`}>
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-black rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
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

      <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
          <div className="text-[10px] sm:text-xs font-bold text-[#1DB954] uppercase tracking-wider flex items-center gap-1 sm:gap-2">
            <span>Spotify</span>
            <div className="flex items-end gap-[2px] h-2 sm:h-3">
              <span className="w-1 bg-[#1DB954] animate-[pulse_1s_ease-in-out_infinite] h-full"></span>
              <span className="w-1 bg-[#1DB954] animate-[pulse_1.2s_ease-in-out_infinite] h-[60%]"></span>
              <span className="w-1 bg-[#1DB954] animate-[pulse_0.8s_ease-in-out_infinite] h-[80%]"></span>
            </div>
          </div>
        </div>
        <div className="truncate font-bold text-primary text-sm sm:text-lg leading-snug sm:leading-normal">{nowPlaying?.title}</div>
        <div className="truncate text-[11px] sm:text-sm text-secondary">{nowPlaying?.artists} • {nowPlaying?.album}</div>
      </div>
    </div>
  );

  if (nowPlaying?.url) {
    return (
      <div className="h-full">
        <a href={nowPlaying.url} target="_blank" rel="noreferrer" className="block h-full">
          {content}
        </a>
      </div>
    );
  }

  return <div className="h-full">{content}</div>;
};
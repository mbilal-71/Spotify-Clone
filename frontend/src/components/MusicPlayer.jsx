import { usePlayer } from '../context/PlayerContext';
import {
  HiPlay,
  HiPause,
  HiForward,
  HiBackward,
  HiSpeakerWave,
  HiSpeakerXMark,
  HiMusicalNote,
} from 'react-icons/hi2';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    togglePlay,
    next,
    previous,
    seek,
    changeVolume,
    toggleMute,
  } = usePlayer();

  if (!currentSong) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const artistName = currentSong.artist?.username || 'Unknown Artist';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="h-[72px] md:h-20 bg-[var(--color-surface-secondary)] border-t border-[var(--color-border)]
                      backdrop-blur-xl px-3 md:px-5 flex items-center">
        
        {/* Progress bar (top edge) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-surface-tertiary)] group cursor-pointer"
             onClick={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               const percent = (e.clientX - rect.left) / rect.width;
               seek(percent * duration);
             }}>
          <div
            className="h-full bg-[var(--color-accent)] transition-[width] duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] 
                            opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
          </div>
        </div>

        {/* Left: Song info */}
        <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-md bg-[var(--color-surface-tertiary)] flex items-center justify-center flex-shrink-0
                          shadow-lg">
            <HiMusicalNote className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-accent)]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
              {currentSong.title}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] truncate">
              {artistName}
            </p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={previous}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer hidden sm:block"
          >
            <HiBackward className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center
                       hover:scale-105 transition-transform cursor-pointer"
          >
            {isPlaying ? (
              <HiPause className="w-5 h-5" />
            ) : (
              <HiPlay className="w-5 h-5 ml-0.5" />
            )}
          </button>

          <button
            onClick={next}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer hidden sm:block"
          >
            <HiForward className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Time + Volume */}
        <div className="flex items-center gap-3 flex-1 justify-end ml-4">
          {/* Time */}
          <span className="text-xs text-[var(--color-text-muted)] hidden md:block whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <HiSpeakerXMark className="w-4 h-4" />
              ) : (
                <HiSpeakerWave className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-20 accent-[var(--color-accent)]"
              style={{
                background: `linear-gradient(to right, var(--color-accent) ${(isMuted ? 0 : volume) * 100}%, #ffffff33 ${(isMuted ? 0 : volume) * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

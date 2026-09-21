import { HiPlay, HiPause, HiMusicalNote } from 'react-icons/hi2';
import { usePlayer } from '../context/PlayerContext';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function SongList({ songs = [], showIndex = true }) {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

  if (songs.length === 0) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-[16px_1fr_auto] md:grid-cols-[16px_1fr_1fr_auto] gap-4 px-4 py-2
                       text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border)]">
        <span className="text-center">#</span>
        <span>Title</span>
        <span className="hidden md:block">Artist</span>
        <span className="text-right">Duration</span>
      </div>

      {/* Song rows */}
      {songs.map((song, index) => {
        const isCurrentSong = currentSong?._id === song._id;
        const artistName = song.artist?.username || 'Unknown Artist';

        return (
          <div
            key={song._id || index}
            className={`group grid grid-cols-[16px_1fr_auto] md:grid-cols-[16px_1fr_1fr_auto] gap-4 px-4 py-3
                        rounded-md cursor-pointer transition-all duration-150
                        ${isCurrentSong ? 'bg-[var(--color-accent-muted)]' : 'hover:bg-[var(--color-surface-hover)]'}`}
            onClick={() => {
              if (isCurrentSong) {
                togglePlay();
              } else {
                playSong(song, songs);
              }
            }}
          >
            {/* Index / play icon */}
            <div className="flex items-center justify-center">
              {isCurrentSong && isPlaying ? (
                <HiPause className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              ) : (
                <>
                  <span className={`text-sm group-hover:hidden ${isCurrentSong ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
                    {showIndex ? index + 1 : <HiMusicalNote className="w-3.5 h-3.5" />}
                  </span>
                  <HiPlay className="w-3.5 h-3.5 text-[var(--color-text-primary)] hidden group-hover:block" />
                </>
              )}
            </div>

            {/* Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded bg-[var(--color-surface-tertiary)] flex items-center justify-center flex-shrink-0">
                <HiMusicalNote className={`w-4 h-4 ${isCurrentSong ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`} />
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${isCurrentSong ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`}>
                  {song.title}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] truncate md:hidden">
                  {artistName}
                </p>
              </div>
            </div>

            {/* Artist (desktop) */}
            <span className="hidden md:flex items-center text-sm text-[var(--color-text-secondary)] truncate">
              {artistName}
            </span>

            {/* Duration placeholder */}
            <span className="flex items-center text-sm text-[var(--color-text-muted)]">
              --:--
            </span>
          </div>
        );
      })}
    </div>
  );
}

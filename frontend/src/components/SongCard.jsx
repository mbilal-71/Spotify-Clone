import { HiPlay, HiMusicalNote } from 'react-icons/hi2';
import { usePlayer } from '../context/PlayerContext';

export default function SongCard({ song, songs = [] }) {
  const { playSong, currentSong, isPlaying } = usePlayer();

  const isCurrentSong = currentSong?._id === song._id;
  const artistName = song.artist?.username || 'Unknown Artist';

  const handlePlay = () => {
    playSong(song, songs.length > 0 ? songs : [song]);
  };

  return (
    <div
      className={`group relative bg-[var(--color-surface-secondary)] rounded-lg p-4 
                  hover:bg-[var(--color-surface-hover)] transition-all duration-300 cursor-pointer
                  ${isCurrentSong ? 'ring-1 ring-[var(--color-accent)]/30' : ''}`}
      onClick={handlePlay}
    >
      {/* Album art placeholder */}
      <div className="relative aspect-square rounded-md overflow-hidden mb-4 bg-[var(--color-surface-tertiary)]
                      shadow-lg shadow-black/30">
        <div className="w-full h-full flex items-center justify-center">
          <HiMusicalNote className={`w-10 h-10 ${isCurrentSong ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`} />
        </div>

        {/* Play button overlay */}
        <button
          className={`absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[var(--color-accent)] text-black
                     flex items-center justify-center shadow-xl shadow-black/40
                     transition-all duration-300 cursor-pointer
                     ${isCurrentSong && isPlaying
                       ? 'opacity-100 translate-y-0'
                       : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                     }
                     hover:scale-105 hover:bg-[var(--color-accent-hover)]`}
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
        >
          <HiPlay className="w-5 h-5 ml-0.5" />
        </button>
      </div>

      {/* Song info */}
      <h3 className={`font-semibold text-sm truncate mb-1
                     ${isCurrentSong ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`}>
        {song.title}
      </h3>
      <p className="text-xs text-[var(--color-text-secondary)] truncate">
        {artistName}
      </p>
    </div>
  );
}

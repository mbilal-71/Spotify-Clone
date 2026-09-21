import { useNavigate } from 'react-router-dom';
import { HiPlay, HiMusicalNote } from 'react-icons/hi2';

export default function AlbumCard({ album }) {
  const navigate = useNavigate();
  const artistName = album.artist?.username || 'Unknown Artist';
  const songCount = album.songs?.length || 0;

  return (
    <div
      className="group relative bg-[var(--color-surface-secondary)] rounded-lg p-4 
                 hover:bg-[var(--color-surface-hover)] transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/albums/${album._id}`)}
    >
      {/* Album cover placeholder */}
      <div className="relative aspect-square rounded-md overflow-hidden mb-4 bg-gradient-to-br from-[#2a1f4e] to-[#0c3547]
                      shadow-lg shadow-black/30">
        <div className="w-full h-full flex items-center justify-center">
          <HiMusicalNote className="w-12 h-12 text-white/20" />
        </div>

        {/* Play button overlay */}
        <button
          className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[var(--color-accent)] text-black
                     flex items-center justify-center shadow-xl shadow-black/40
                     opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300 hover:scale-105 hover:bg-[var(--color-accent-hover)] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/albums/${album._id}`);
          }}
        >
          <HiPlay className="w-5 h-5 ml-0.5" />
        </button>
      </div>

      {/* Album info */}
      <h3 className="font-semibold text-sm text-[var(--color-text-primary)] truncate mb-1">
        {album.title}
      </h3>
      <p className="text-xs text-[var(--color-text-secondary)] truncate">
        {artistName} · {songCount} {songCount === 1 ? 'song' : 'songs'}
      </p>
    </div>
  );
}

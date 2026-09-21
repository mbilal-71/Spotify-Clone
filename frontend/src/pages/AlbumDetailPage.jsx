import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumById } from '../services/musicApi';
import { usePlayer } from '../context/PlayerContext';
import SongList from '../components/SongList';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { HiPlay, HiArrowLeft, HiMusicalNote } from 'react-icons/hi2';

export default function AlbumDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlbum = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAlbumById(id);
      setAlbum(data.album);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load album');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  const handlePlayAll = () => {
    if (album?.songs?.length > 0) {
      playSong(album.songs[0], album.songs);
    }
  };

  if (loading) return <LoadingState message="Loading album..." />;
  if (error) return <ErrorState message={error} onRetry={fetchAlbum} />;
  if (!album) return <ErrorState message="Album not found" />;

  const artistName = album.artist?.username || 'Unknown Artist';
  const songs = album.songs || [];

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                   transition-colors mb-6 cursor-pointer"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Album header */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        {/* Album cover */}
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg bg-gradient-to-br from-[#2a1f4e] to-[#0c3547]
                        flex items-center justify-center shadow-2xl shadow-black/50 flex-shrink-0">
          <HiMusicalNote className="w-16 h-16 text-white/20" />
        </div>

        {/* Album info */}
        <div className="flex flex-col justify-end">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
            Album
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-3 leading-tight">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <span className="font-medium text-[var(--color-text-primary)]">{artistName}</span>
            <span>·</span>
            <span>{songs.length} {songs.length === 1 ? 'song' : 'songs'}</span>
          </div>

          {/* Play all button */}
          {songs.length > 0 && (
            <button
              onClick={handlePlayAll}
              className="mt-5 flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--color-accent)] text-black
                         font-bold text-sm hover:bg-[var(--color-accent-hover)] hover:scale-105
                         transition-all duration-200 w-fit cursor-pointer shadow-lg shadow-[var(--color-accent)]/20"
            >
              <HiPlay className="w-5 h-5" />
              Play All
            </button>
          )}
        </div>
      </div>

      {/* Songs */}
      {songs.length > 0 ? (
        <SongList songs={songs} />
      ) : (
        <EmptyState title="No songs in this album" message="This album doesn't have any songs yet." />
      )}
    </div>
  );
}

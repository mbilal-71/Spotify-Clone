import { useState, useEffect } from 'react';
import { getAllAlbums } from '../services/musicApi';
import AlbumCard from '../components/AlbumCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlbums = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllAlbums();
      setAlbums(data.albums || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load albums');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (loading) return <LoadingState message="Loading albums..." />;
  if (error) return <ErrorState message={error} onRetry={fetchAlbums} />;
  if (albums.length === 0) return <EmptyState title="No albums yet" message="Albums will appear here once artists create them." />;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
          Albums
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Browse all available albums
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {albums.map((album, index) => (
          <div key={album._id} className={`animate-fade-in stagger-${Math.min(index + 1, 5)}`} style={{ opacity: 0 }}>
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </div>
  );
}

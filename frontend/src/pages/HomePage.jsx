import { useState, useEffect } from 'react';
import { getAllSongs } from '../services/musicApi';
import { getAllAlbums } from '../services/musicApi';
import SongCard from '../components/SongCard';
import AlbumCard from '../components/AlbumCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export default function HomePage() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [songsRes, albumsRes] = await Promise.all([
        getAllSongs(),
        getAllAlbums(),
      ]);
      setSongs(songsRes.songs || []);
      setAlbums(albumsRes.albums || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load music');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingState message="Loading your music..." />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  const hasSongs = songs.length > 0;
  const hasAlbums = albums.length > 0;

  if (!hasSongs && !hasAlbums) {
    return <EmptyState title="No music yet" message="Songs and albums will appear here once artists start uploading." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
          {getGreeting()}
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Discover and enjoy your favorite music
        </p>
      </div>

      {/* Songs section */}
      {hasSongs && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Trending Songs
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {songs.map((song, index) => (
              <div key={song._id} className={`animate-fade-in stagger-${Math.min(index + 1, 5)}`} style={{ opacity: 0 }}>
                <SongCard song={song} songs={songs} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums section */}
      {hasAlbums && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Featured Albums
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {albums.map((album, index) => (
              <div key={album._id} className={`animate-fade-in stagger-${Math.min(index + 1, 5)}`} style={{ opacity: 0 }}>
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

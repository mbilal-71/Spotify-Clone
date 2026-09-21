import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllSongs, getAllAlbums } from '../services/musicApi';
import SongList from '../components/SongList';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import {
  HiOutlineArrowUpTray,
  HiOutlinePlusCircle,
  HiOutlineMusicalNote,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';

export default function ArtistDashboard() {
  const { user } = useAuth();
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
      // Filter to show only this artist's content
      // Backend populates artist.username, so we match on that
      const mySongs = (songsRes.songs || []).filter(
        (s) => s.artist?.username === user?.username
      );
      const myAlbums = (albumsRes.albums || []).filter(
        (a) => a.artist?.username === user?.username
      );
      setSongs(mySongs);
      setAlbums(myAlbums);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingState message="Loading your studio..." />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
          Artist Studio
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Welcome back, {user?.username}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--color-surface-secondary)] rounded-xl p-5 border border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-muted)] flex items-center justify-center">
              <HiOutlineMusicalNote className="w-4 h-4 text-[var(--color-accent)]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{songs.length}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Songs Uploaded</p>
        </div>

        <div className="bg-[var(--color-surface-secondary)] rounded-xl p-5 border border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <HiOutlineSquares2X2 className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{albums.length}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Albums Created</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/artist/upload"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-black font-semibold text-sm
                     hover:bg-[var(--color-accent-hover)] hover:scale-105 transition-all duration-200"
        >
          <HiOutlineArrowUpTray className="w-4 h-4" />
          Upload Song
        </Link>
        <Link
          to="/artist/albums"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)] font-semibold text-sm
                     border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:scale-105 transition-all duration-200"
        >
          <HiOutlinePlusCircle className="w-4 h-4" />
          Create Album
        </Link>
      </div>

      {/* My songs */}
      <section>
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
          Your Songs
        </h2>
        {songs.length > 0 ? (
          <SongList songs={songs} />
        ) : (
          <EmptyState title="No songs yet" message="Upload your first track to get started." />
        )}
      </section>
    </div>
  );
}

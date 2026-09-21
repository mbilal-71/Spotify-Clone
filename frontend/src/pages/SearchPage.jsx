import { useState, useEffect, useMemo } from 'react';
import { getAllSongs, getAllAlbums } from '../services/musicApi';
import SongCard from '../components/SongCard';
import AlbumCard from '../components/AlbumCard';
import SearchBar from '../components/SearchBar';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export default function SearchPage() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

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
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Client-side filtering
  const filteredSongs = useMemo(() => {
    if (!query.trim()) return songs;
    const lower = query.toLowerCase();
    return songs.filter(
      (s) =>
        s.title?.toLowerCase().includes(lower) ||
        s.artist?.username?.toLowerCase().includes(lower)
    );
  }, [songs, query]);

  const filteredAlbums = useMemo(() => {
    if (!query.trim()) return albums;
    const lower = query.toLowerCase();
    return albums.filter(
      (a) =>
        a.title?.toLowerCase().includes(lower) ||
        a.artist?.username?.toLowerCase().includes(lower)
    );
  }, [albums, query]);

  if (loading) return <LoadingState message="Loading library..." />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  const hasResults = filteredSongs.length > 0 || filteredAlbums.length > 0;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Search
        </h1>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {!hasResults && query ? (
        <EmptyState
          title="No results found"
          message={`No songs or albums match "${query}". Try a different search.`}
        />
      ) : !hasResults ? (
        <EmptyState title="Nothing here yet" message="Music will appear here once available." />
      ) : (
        <div className="space-y-8">
          {/* Filtered songs */}
          {filteredSongs.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                Songs {query && <span className="text-[var(--color-text-muted)] font-normal text-sm">({filteredSongs.length})</span>}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredSongs.map((song) => (
                  <SongCard key={song._id} song={song} songs={filteredSongs} />
                ))}
              </div>
            </section>
          )}

          {/* Filtered albums */}
          {filteredAlbums.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                Albums {query && <span className="text-[var(--color-text-muted)] font-normal text-sm">({filteredAlbums.length})</span>}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredAlbums.map((album) => (
                  <AlbumCard key={album._id} album={album} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

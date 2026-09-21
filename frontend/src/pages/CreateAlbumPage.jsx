import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllSongs } from '../services/musicApi';
import { createAlbum } from '../services/artistApi';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineMusicalNote,
  HiCheck,
} from 'react-icons/hi2';

export default function CreateAlbumPage() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [title, setTitle] = useState('');
  const [selectedSongIds, setSelectedSongIds] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const fetchSongs = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getAllSongs();
      // Filter to artist's own songs
      const mySongs = (data.songs || []).filter(
        (s) => s.artist?.username === user?.username
      );
      setSongs(mySongs);
    } catch (err) {
      setFetchError(err.response?.data?.message || 'Failed to load songs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const toggleSong = (songId) => {
    setSelectedSongIds((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (!title.trim()) {
      setError('Please enter an album title');
      return;
    }

    if (selectedSongIds.length === 0) {
      setError('Please select at least one song');
      return;
    }

    setSubmitting(true);
    try {
      const data = await createAlbum({
        title: title.trim(),
        songId: selectedSongIds,
      });
      setSuccess(data.album);
      setTitle('');
      setSelectedSongIds([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create album');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState message="Loading your songs..." />;
  if (fetchError) return <ErrorState message={fetchError} onRetry={fetchSongs} />;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
        Create Album
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">
        Group your songs into an album
      </p>

      {/* Success message */}
      {success && (
        <div className="mb-6 px-5 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
          <HiOutlineCheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-emerald-400">Album created successfully!</p>
            <p className="text-xs text-emerald-400/70 mt-1">
              "{success.title}" with {success.songs?.length || 0} songs is now available.
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <HiOutlineXCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {songs.length === 0 ? (
        <EmptyState
          title="No songs to add"
          message="You need to upload songs first before creating an album."
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Album title */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
              Album Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]
                         border border-[var(--color-border)] outline-none text-sm
                         focus:border-[var(--color-accent)] transition-colors
                         placeholder:text-[var(--color-text-muted)]"
              placeholder="Enter album title"
            />
          </div>

          {/* Song selector */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-3">
              Select Songs ({selectedSongIds.length} selected)
            </label>
            <div className="space-y-1 max-h-80 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
              {songs.map((song) => {
                const isSelected = selectedSongIds.includes(song._id);
                return (
                  <div
                    key={song._id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150
                               ${isSelected ? 'bg-[var(--color-accent-muted)]' : 'hover:bg-[var(--color-surface-hover)]'}`}
                    onClick={() => toggleSong(song._id)}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all
                                 ${isSelected
                                   ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                                   : 'border-[var(--color-text-muted)] bg-transparent'
                                 }`}
                    >
                      {isSelected && <HiCheck className="w-3 h-3 text-black" />}
                    </div>

                    {/* Song icon */}
                    <div className="w-8 h-8 rounded bg-[var(--color-surface-tertiary)] flex items-center justify-center flex-shrink-0">
                      <HiOutlineMusicalNote className={`w-4 h-4 ${isSelected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`} />
                    </div>

                    {/* Song info */}
                    <p className={`text-sm truncate ${isSelected ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-text-primary)]'}`}>
                      {song.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting || selectedSongIds.length === 0}
            className="w-full py-3 rounded-full bg-[var(--color-accent)] text-black font-bold text-sm
                       hover:bg-[var(--color-accent-hover)] hover:scale-[1.02] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Creating album...
              </span>
            ) : (
              `Create Album (${selectedSongIds.length} songs)`
            )}
          </button>
        </form>
      )}
    </div>
  );
}

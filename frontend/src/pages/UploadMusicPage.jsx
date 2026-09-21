import { useState, useRef } from 'react';
import { uploadMusic } from '../services/artistApi';
import {
  HiOutlineArrowUpTray,
  HiOutlineMusicalNote,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from 'react-icons/hi2';

export default function UploadMusicPage() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Auto-fill title from filename (without extension)
      if (!title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        setTitle(nameWithoutExt);
      }
      setError('');
      setSuccess(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (!selectedFile) {
      setError('Please select a song file');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a song title');
      return;
    }

    const formData = new FormData();
    formData.append('song', selectedFile);
    formData.append('title', title.trim());

    setUploading(true);
    setProgress(0);

    try {
      const data = await uploadMusic(formData, (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      });
      setSuccess(data.song);
      // Reset form
      setSelectedFile(null);
      setTitle('');
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
        Upload Music
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">
        Share your music with the world
      </p>

      {/* Success message */}
      {success && (
        <div className="mb-6 px-5 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
          <HiOutlineCheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-emerald-400">Song uploaded successfully!</p>
            <p className="text-xs text-emerald-400/70 mt-1">"{success.title}" is now available.</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File drop zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
                     ${selectedFile
                       ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent-muted)]'
                       : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)] bg-[var(--color-surface-secondary)]'
                     }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {selectedFile ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/20 flex items-center justify-center">
                <HiOutlineMusicalNote className="w-7 h-7 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{selectedFile.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{formatFileSize(selectedFile.size)}</p>
              </div>
              <p className="text-xs text-[var(--color-accent)]">Click to change file</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-surface-tertiary)] flex items-center justify-center">
                <HiOutlineArrowUpTray className="w-7 h-7 text-[var(--color-text-muted)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">Click to select a song</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">MP3, WAV, FLAC, OGG supported</p>
              </div>
            </div>
          )}
        </div>

        {/* Title input */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
            Song Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]
                       border border-[var(--color-border)] outline-none text-sm
                       focus:border-[var(--color-accent)] transition-colors
                       placeholder:text-[var(--color-text-muted)]"
            placeholder="Enter song title"
          />
        </div>

        {/* Upload progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--color-surface-tertiary)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] rounded-full transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className="w-full py-3 rounded-full bg-[var(--color-accent)] text-black font-bold text-sm
                     hover:bg-[var(--color-accent-hover)] hover:scale-[1.02] transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Uploading...
            </span>
          ) : (
            'Upload Song'
          )}
        </button>
      </form>
    </div>
  );
}

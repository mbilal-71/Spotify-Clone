import { HiOutlineMusicalNote } from 'react-icons/hi2';

export default function EmptyState({ title = 'Nothing here yet', message = 'Content will appear here once available.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-[var(--color-surface-tertiary)] flex items-center justify-center mb-4">
        <HiOutlineMusicalNote className="w-10 h-10 text-[var(--color-text-muted)]" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-text-secondary)] text-sm text-center max-w-md">
        {message}
      </p>
    </div>
  );
}

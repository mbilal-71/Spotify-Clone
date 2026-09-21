import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

export default function SearchBar({ value, onChange, placeholder = 'Search songs, albums...' }) {
  return (
    <div className="relative w-full max-w-md group">
      <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] 
                                     group-focus-within:text-[var(--color-text-primary)] transition-colors" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)] text-sm
                   rounded-full border border-transparent outline-none placeholder:text-[var(--color-text-muted)]
                   focus:border-[var(--color-accent)] focus:bg-[var(--color-surface-elevated)]
                   transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
                     bg-[var(--color-text-muted)] text-[var(--color-surface-primary)]
                     flex items-center justify-center hover:bg-[var(--color-text-secondary)] transition-colors cursor-pointer"
        >
          <HiXMark className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

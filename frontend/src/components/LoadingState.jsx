export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-[var(--color-border)] rounded-full" />
        <div className="absolute top-0 left-0 w-12 h-12 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="mt-4 text-[var(--color-text-secondary)] text-sm font-medium">
        {message}
      </p>
    </div>
  );
}

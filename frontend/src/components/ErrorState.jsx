import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <HiOutlineExclamationTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        Oops!
      </h3>
      <p className="text-[var(--color-text-secondary)] text-sm mb-6 text-center max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-[var(--color-accent)] text-black font-semibold rounded-full text-sm
                     hover:bg-[var(--color-accent-hover)] hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

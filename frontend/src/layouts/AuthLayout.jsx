import { Outlet } from 'react-router-dom';
import { HiOutlineMusicalNote } from 'react-icons/hi2';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-primary)] flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-purple-900/10 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-emerald-400 flex items-center justify-center">
            <HiOutlineMusicalNote className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-bold text-[var(--color-text-primary)]">Streamify</span>
        </div>

        {/* Card */}
        <div className="bg-[var(--color-surface-secondary)] rounded-2xl p-8 border border-[var(--color-border)]
                        shadow-2xl shadow-black/40">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
          © 2026 Streamify. Your music, your way.
        </p>
      </div>
    </div>
  );
}

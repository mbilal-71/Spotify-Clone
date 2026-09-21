import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBars3, HiOutlineArrowRightStartOnRectangle } from 'react-icons/hi2';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6
                       bg-[var(--color-surface-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] cursor-pointer"
        >
          <HiOutlineBars3 className="w-5 h-5" />
        </button>
      </div>

      {/* Right: user info + logout */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-3">
            {/* User badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-tertiary)]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-emerald-400
                              flex items-center justify-center text-xs font-bold text-black">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {user.username}
              </span>
              {user.role === 'artist' && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-accent-muted)] px-1.5 py-0.5 rounded">
                  Artist
                </span>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]
                         hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              title="Logout"
            >
              <HiOutlineArrowRightStartOnRectangle className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineMagnifyingGlass,
  HiOutlineMusicalNote,
  HiOutlineArrowUpTray,
  HiOutlinePlusCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
   ${isActive
     ? 'bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]'
     : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-tertiary)]'
   }`;

export default function Sidebar({ isOpen, onClose }) {
  const { isArtist } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-surface-primary)] border-r border-[var(--color-border)]
                    flex flex-col z-50 transition-transform duration-300 ease-out
                    lg:translate-x-0 lg:static lg:z-auto
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-emerald-400 flex items-center justify-center">
              <HiOutlineMusicalNote className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold text-[var(--color-text-primary)]">Streamify</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] cursor-pointer"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="mb-6">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Menu
            </p>
            <NavLink to="/" end className={navLinkClass} onClick={onClose}>
              <HiOutlineHome className="w-5 h-5" />
              Home
            </NavLink>
            <NavLink to="/search" className={navLinkClass} onClick={onClose}>
              <HiOutlineMagnifyingGlass className="w-5 h-5" />
              Search
            </NavLink>
            <NavLink to="/albums" className={navLinkClass} onClick={onClose}>
              <HiOutlineSquares2X2 className="w-5 h-5" />
              Albums
            </NavLink>
          </div>

          {/* Artist section */}
          {isArtist && (
            <div>
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Artist Studio
              </p>
              <NavLink to="/artist" end className={navLinkClass} onClick={onClose}>
                <HiOutlineMusicalNote className="w-5 h-5" />
                Dashboard
              </NavLink>
              <NavLink to="/artist/upload" className={navLinkClass} onClick={onClose}>
                <HiOutlineArrowUpTray className="w-5 h-5" />
                Upload Music
              </NavLink>
              <NavLink to="/artist/albums" className={navLinkClass} onClick={onClose}>
                <HiOutlinePlusCircle className="w-5 h-5" />
                Create Album
              </NavLink>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            © 2026 Streamify
          </p>
        </div>
      </aside>
    </>
  );
}

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MusicPlayer from '../components/MusicPlayer';
import { usePlayer } from '../context/PlayerContext';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentSong } = usePlayer();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-surface-primary)]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className={`flex-1 overflow-y-auto px-4 md:px-6 py-6 ${currentSong ? 'pb-24 md:pb-28' : ''}`}>
          <Outlet />
        </main>
      </div>

      {/* Persistent music player */}
      <MusicPlayer />
    </div>
  );
}

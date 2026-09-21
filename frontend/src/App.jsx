import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import ProtectedRoute from './components/ProtectedRoute';
import ArtistRoute from './components/ArtistRoute';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import SearchPage from './pages/SearchPage';
import ArtistDashboard from './pages/ArtistDashboard';
import UploadMusicPage from './pages/UploadMusicPage';
import CreateAlbumPage from './pages/CreateAlbumPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <Routes>
            {/* Public auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/albums" element={<AlbumsPage />} />
              <Route path="/albums/:id" element={<AlbumDetailPage />} />

              {/* Artist-only routes */}
              <Route
                path="/artist"
                element={
                  <ArtistRoute>
                    <ArtistDashboard />
                  </ArtistRoute>
                }
              />
              <Route
                path="/artist/upload"
                element={
                  <ArtistRoute>
                    <UploadMusicPage />
                  </ArtistRoute>
                }
              />
              <Route
                path="/artist/albums"
                element={
                  <ArtistRoute>
                    <CreateAlbumPage />
                  </ArtistRoute>
                }
              />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

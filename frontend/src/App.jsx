import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UploadResumePage from './pages/UploadResumePage';
import EditorPage from './pages/EditorPage';
import ExportPage from './pages/ExportPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#080b12]/80 px-6 py-4 border-b border-[#1e2d3d] backdrop-blur-xl">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Portfolio Builder</Link>
        <div className="flex items-center gap-6">
          {token ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">Dashboard</Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors bg-transparent border-none p-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">Login</Link>
              <Link to="/register">
                <button className="!bg-teal-600 hover:!bg-teal-500 shadow-lg shadow-teal-900/20">Register</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResumePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/export/:id"
          element={
            <ProtectedRoute>
              <ExportPage />
            </ProtectedRoute>
          }
        />
        <Route path="/portfolio/:username" element={<PublicPortfolioPage />} />
      </Routes>
    </div>
  );
}

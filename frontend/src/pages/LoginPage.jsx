import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineCheckCircle } from 'react-icons/hi2';

export default function LoginPage() {
  const location = useLocation();
  const [identifier, setIdentifier] = useState(location.state?.identifier || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!identifier.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login({ identifier, password });
      navigate('/');
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to server. Please make sure the backend is running on port 3000.');
      } else {
        const message = err.response?.data?.message || 'Login failed. Please try again.';
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
        Welcome back
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        Log in to continue to Streamify
      </p>

      {successMessage && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2 animate-fade-in">
          <HiOutlineCheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
            Username or Email
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]
                       border border-[var(--color-border)] outline-none text-sm
                       focus:border-[var(--color-accent)] transition-colors
                       placeholder:text-[var(--color-text-muted)]"
            placeholder="Enter your username or email"
            autoComplete="username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-3 pr-11 rounded-lg bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]
                         border border-[var(--color-border)] outline-none text-sm
                         focus:border-[var(--color-accent)] transition-colors
                         placeholder:text-[var(--color-text-muted)]"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <HiOutlineEyeSlash className="w-5 h-5" />
              ) : (
                <HiOutlineEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[var(--color-accent)] text-black font-bold text-sm
                     hover:bg-[var(--color-accent-hover)] hover:scale-[1.02] transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Logging in...
            </span>
          ) : (
            'Log In'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-[var(--color-accent)] hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}

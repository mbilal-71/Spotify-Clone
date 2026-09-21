import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Validation checks
  const validations = {
    username: username.trim().length >= 3,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password: password.length >= 6,
  };

  const allValid = validations.username && validations.email && validations.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!validations.username) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (!validations.email) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validations.password) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register({ username, email, password, role });
      navigate('/login', {
        state: {
          message: 'Account created successfully! Please log in to enter.',
          identifier: username,
        },
      });
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (!err.response) {
        // Network error — backend not reachable
        setError('Cannot connect to server. Please make sure the backend is running on port 3000.');
      } else if (status === 409) {
        setError(message || 'A user with this username or email already exists.');
      } else if (status === 400) {
        setError(message || 'Invalid input. Please check your details and try again.');
      } else if (status === 500) {
        setError('Server error. Please try again later or check backend logs.');
      } else {
        setError(message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
        Create account
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        Sign up to start listening
      </p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
          <HiOutlineXCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]
                       border border-[var(--color-border)] outline-none text-sm
                       focus:border-[var(--color-accent)] transition-colors
                       placeholder:text-[var(--color-text-muted)]"
            placeholder="Choose a username"
            autoComplete="username"
          />
          {/* Requirement indicator */}
          <Requirement met={validations.username} text="At least 3 characters" show={username.length > 0} />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]
                       border border-[var(--color-border)] outline-none text-sm
                       focus:border-[var(--color-accent)] transition-colors
                       placeholder:text-[var(--color-text-muted)]"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Requirement met={validations.email} text="Valid email address" show={email.length > 0} />
        </div>

        {/* Password */}
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
              placeholder="Create a password"
              autoComplete="new-password"
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
          <Requirement met={validations.password} text="At least 6 characters" show={password.length > 0} />
        </div>

        {/* Role selector */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            I want to
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer
                ${role === 'user'
                  ? 'bg-[var(--color-accent-muted)] border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'bg-[var(--color-surface-tertiary)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
                }`}
            >
              🎧 Listen
            </button>
            <button
              type="button"
              onClick={() => setRole('artist')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer
                ${role === 'artist'
                  ? 'bg-[var(--color-accent-muted)] border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'bg-[var(--color-surface-tertiary)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
                }`}
            >
              🎤 Create
            </button>
          </div>
        </div>

        {/* Requirements summary */}
        <div className="px-4 py-3 rounded-lg bg-[var(--color-surface-tertiary)] border border-[var(--color-border)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            Requirements
          </p>
          <div className="space-y-1.5">
            <RequirementRow met={validations.username} text="Username: at least 3 characters, must be unique" />
            <RequirementRow met={validations.email} text="Email: valid format, must be unique" />
            <RequirementRow met={validations.password} text="Password: at least 6 characters" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !allValid}
          className="w-full py-3 rounded-full bg-[var(--color-accent)] text-black font-bold text-sm
                     hover:bg-[var(--color-accent-hover)] hover:scale-[1.02] transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-[var(--color-accent)] hover:underline font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}

/** Inline requirement shown below each input field */
function Requirement({ met, text, show }) {
  if (!show) return null;
  return (
    <p className={`flex items-center gap-1.5 mt-1.5 text-xs transition-colors duration-200
                  ${met ? 'text-emerald-400' : 'text-[var(--color-text-muted)]'}`}>
      {met ? (
        <HiOutlineCheckCircle className="w-3.5 h-3.5" />
      ) : (
        <HiOutlineXCircle className="w-3.5 h-3.5 text-red-400" />
      )}
      {text}
    </p>
  );
}

/** Requirement row for the summary box */
function RequirementRow({ met, text }) {
  return (
    <div className={`flex items-center gap-2 text-xs transition-colors duration-200
                    ${met ? 'text-emerald-400' : 'text-[var(--color-text-secondary)]'}`}>
      {met ? (
        <HiOutlineCheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
      ) : (
        <div className="w-3.5 h-3.5 rounded-full border border-[var(--color-text-muted)] flex-shrink-0" />
      )}
      <span>{text}</span>
    </div>
  );
}

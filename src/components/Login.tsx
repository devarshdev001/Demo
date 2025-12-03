import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../utils/supabase/client';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact' | 'payment';

interface UserSession {
  id: string;
  email: string;
  accessToken: string;
}

interface LoginProps {
  onNavigate: (page: PageType) => void;
  onLogin: (session: UserSession) => void;
  pendingNavigation?: { page: PageType; plan?: string; cycle?: 'monthly' | 'yearly' } | null;
}

export function Login({ onNavigate, onLogin, pendingNavigation }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!data.session?.access_token || !data.user) {
        throw new Error('No access token received');
      }

      console.log('Login successful:', data);
      
      // Call the onLogin callback with session data
      onLogin({
        id: data.user.id,
        email: data.user.email || '',
        accessToken: data.session.access_token
      });

      // Show appropriate message based on whether user was redirected from payment
      if (pendingNavigation?.page === 'payment') {
        alert('Login successful! Redirecting to payment...');
      } else {
        alert('Login successful! Welcome back.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Login Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-200 p-10 lg:p-12">
            <div className="mb-8">
              <h1 className="text-4xl text-amber-950 mb-3">Welcome Back</h1>
              <p className="text-amber-700 text-lg">
                Login to your QueueLess dashboard
              </p>
              {pendingNavigation?.page === 'payment' && (
                <div className="mt-4 bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
                  <p className="text-amber-900">
                    🔒 Please login to proceed with payment for the <strong>{pendingNavigation.plan}</strong> plan.
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-amber-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-amber-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-5 h-5 border-2 border-amber-300 rounded focus:ring-2 focus:ring-amber-500 text-amber-600"
                  />
                  <span className="text-amber-900">Remember me</span>
                </label>
                <button type="button" className="text-amber-600 hover:text-amber-800 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
                  <p className="text-red-800">❌ {error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-amber-200"></div>
              <span className="text-amber-600">or</span>
              <div className="flex-1 h-px bg-amber-200"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-amber-800">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                Sign up for free
              </button>
            </p>
          </div>

          {/* Right side - Feature Highlights */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-2xl mb-3">Real-time Analytics</h3>
                <p className="text-amber-50">
                  Track orders, revenue, and customer preferences in real-time from your dashboard.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl">🔔</span>
                </div>
                <h3 className="text-2xl mb-3">Instant Notifications</h3>
                <p className="text-blue-50">
                  Get notified immediately when customers place orders at any table.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl mb-3">Easy Management</h3>
                <p className="text-purple-50">
                  Update menus, manage tables, and track payments all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
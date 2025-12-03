import { Mail, Lock, User, Phone, Building2, MapPin, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact';

interface SignupProps {
  onNavigate: (page: PageType) => void;
}

export function Signup({ onNavigate }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessType: 'cafe',
    numberOfTables: '1-10',
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      // Call the signup endpoint
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-bc6878db/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            businessName: formData.businessName,
            ownerName: formData.ownerName,
            phone: formData.phone,
            businessType: formData.businessType,
            numberOfTables: formData.numberOfTables,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      console.log('Signup successful:', data);
      alert('Account created successfully! Please login.');
      onNavigate('login');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
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

      <div className="max-w-4xl mx-auto relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-200 p-10 lg:p-12">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl">🎉</span>
              <span className="text-xl">Start Your Free Trial</span>
            </div>
            <h1 className="text-4xl text-amber-950 mb-3">Create Your Account</h1>
            <p className="text-amber-700 text-lg">
              Join thousands of restaurants using QueueLess
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information Section */}
            <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
              <h2 className="text-xl text-amber-950 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                Business Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Business Name */}
                <div>
                  <label htmlFor="businessName" className="block text-amber-900 mb-2">
                    Business Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                    <input
                      type="text"
                      id="businessName"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                      placeholder="e.g., Sunrise Cafe"
                    />
                  </div>
                </div>

                {/* Owner Name */}
                <div>
                  <label htmlFor="ownerName" className="block text-amber-900 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                    <input
                      type="text"
                      id="ownerName"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Business Type */}
                <div>
                  <label htmlFor="businessType" className="block text-amber-900 mb-2">
                    Business Type *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                    <select
                      id="businessType"
                      required
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                    >
                      <option value="cafe">Cafe</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="fine-dining">Fine Dining</option>
                      <option value="fast-food">Fast Food</option>
                      <option value="bar">Bar & Pub</option>
                      <option value="chain">Restaurant Chain</option>
                    </select>
                  </div>
                </div>

                {/* Number of Tables */}
                <div>
                  <label htmlFor="numberOfTables" className="block text-amber-900 mb-2">
                    Number of Tables *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                    <select
                      id="numberOfTables"
                      required
                      value={formData.numberOfTables}
                      onChange={(e) => setFormData({ ...formData, numberOfTables: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                    >
                      <option value="1-10">1-10 tables</option>
                      <option value="11-25">11-25 tables</option>
                      <option value="26-50">26-50 tables</option>
                      <option value="51-100">51-100 tables</option>
                      <option value="100+">100+ tables</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <h2 className="text-xl text-amber-950 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Contact Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-amber-900 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-amber-900 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <h2 className="text-xl text-amber-950 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                Security
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-amber-900 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-amber-900 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-12 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="mt-1 w-5 h-5 border-2 border-amber-300 rounded focus:ring-2 focus:ring-amber-500 text-amber-600"
              />
              <label htmlFor="agreeToTerms" className="text-amber-900">
                I agree to the{' '}
                <a href="#" className="text-amber-600 hover:text-amber-800 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-amber-600 hover:text-amber-800 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
                <p className="text-red-800">❌ {error}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account & Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Free Trial Notice */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 text-center">
              <p className="text-green-800">
                🎉 <strong>30-day free trial</strong> - No credit card required
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-amber-200"></div>
            <span className="text-amber-600">or</span>
            <div className="flex-1 h-px bg-amber-200"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-amber-800">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-amber-600 hover:text-amber-800 transition-colors"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
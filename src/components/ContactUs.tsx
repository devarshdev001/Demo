import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Building2 } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact';

interface ContactUsProps {
  onNavigate: (page: PageType) => void;
}

export function ContactUs({ onNavigate }: ContactUsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Call the contact endpoint
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-bc6878db/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      console.log('Contact form submitted successfully:', data);
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        subject: 'general',
        message: '',
      });
    } catch (err: any) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
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

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl mb-6 shadow-xl">
            <MessageSquare className="w-6 h-6" />
            <span className="text-xl">We're Here to Help</span>
          </div>
          <h1 className="text-4xl lg:text-6xl text-amber-950 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Have questions about QueueLess? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Cards */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-2xl mb-2">Email Us</h3>
            <p className="text-blue-50 mb-4">Our team is ready to help you</p>
            <a href="mailto:support@queueless.com" className="text-white underline hover:text-blue-100 transition-colors">
              support@queueless.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="text-2xl mb-2">Call Us</h3>
            <p className="text-purple-50 mb-4">Mon-Fri from 8am to 6pm</p>
            <a href="tel:+1-555-123-4567" className="text-white underline hover:text-purple-100 transition-colors">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-2xl mb-2">Visit Us</h3>
            <p className="text-amber-50 mb-4">Come say hello at our office</p>
            <address className="text-white not-italic">
              123 Tech Street, Suite 100<br />
              San Francisco, CA 94105
            </address>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-200 p-10">
            <h2 className="text-3xl text-amber-950 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-amber-900 mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-amber-900 mb-2">
                  Email Address *
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

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-amber-900 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-amber-900 mb-2">
                  Business Name (Optional)
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white"
                    placeholder="Your Restaurant Name"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-amber-900 mb-2">
                  What can we help you with? *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="demo">Request a Demo</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-amber-900 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors bg-white resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
                  <p className="text-red-800">❌ {error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 text-center">
                  <p className="text-green-800">✅ Thank you for contacting us! We will get back to you soon.</p>
                </div>
              )}
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-amber-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-amber-950">Business Hours</h3>
              </div>
              <div className="space-y-3 text-amber-800">
                <div className="flex justify-between py-2 border-b border-amber-100">
                  <span>Monday - Friday</span>
                  <span className="text-amber-900">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-amber-100">
                  <span>Saturday</span>
                  <span className="text-amber-900">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Sunday</span>
                  <span className="text-amber-900">Closed</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-amber-700">
                * All times are Pacific Standard Time (PST)
              </p>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-amber-200 p-8">
              <h3 className="text-2xl text-amber-950 mb-6">Quick Help</h3>
              <div className="space-y-4">
                <a href="#" className="block p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors border-2 border-amber-200">
                  <h4 className="text-amber-900 mb-1">Getting Started Guide</h4>
                  <p className="text-sm text-amber-700">Learn how to set up your account</p>
                </a>
                <a href="#" className="block p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors border-2 border-amber-200">
                  <h4 className="text-amber-900 mb-1">Pricing & Plans</h4>
                  <p className="text-sm text-amber-700">Find the perfect plan for your business</p>
                </a>
                <a href="#" className="block p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors border-2 border-amber-200">
                  <h4 className="text-amber-900 mb-1">FAQ</h4>
                  <p className="text-sm text-amber-700">Answers to common questions</p>
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl">Quick Response</h3>
              </div>
              <p className="text-green-50 mb-4">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
              <p className="text-green-100 text-sm">
                For urgent matters, please call us directly at +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
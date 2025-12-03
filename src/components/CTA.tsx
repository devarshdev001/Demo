import { ArrowRight, Mail, Phone, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact';

interface CTAProps {
  onNavigate: (page: PageType) => void;
}

export function CTA({ onNavigate }: CTAProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-amber-900 via-orange-900 to-amber-950 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full opacity-10 blur-3xl"></div>
          
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-12 lg:p-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-amber-200 rounded-full mb-6 border border-amber-400/30">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="text-sm">Rated 4.9/5 by 500+ restaurants</span>
              </div>
              <h2 className="text-4xl lg:text-6xl text-white mb-6">
                Ready to Transform Your Restaurant?
              </h2>
              <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                Join hundreds of restaurants and cafes already using QueueLess to delight customers, 
                boost revenue, and streamline operations.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">No setup fees or hidden costs</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">Free 30-day trial with full features</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">24/7 customer support & onboarding</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="px-10 py-5 bg-white text-amber-900 rounded-2xl hover:bg-amber-50 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  View Plan
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-10 py-5 border-2 border-white/50 text-white rounded-2xl hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm">
                  Schedule Demo
                </button>
              </div>
              <div className="pt-8 border-t-2 border-white/20">
                <div className="grid sm:grid-cols-2 gap-4 text-white">
                  <a href="mailto:hello@queueless.com" className="flex items-center gap-3 hover:text-amber-200 transition-colors p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-200">Email Us</div>
                      <div className="text-sm">hello@queueless.com</div>
                    </div>
                  </a>
                  <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-amber-200 transition-colors p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-200">Call Us</div>
                      <div className="text-sm">+1 (234) 567-890</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative h-full min-h-[600px]">
              <div className="absolute inset-0">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1763272594094-946e5be3ccbe?w=800&h=900&fit=crop"
                  alt="Modern restaurant with QR code ordering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-24 pt-12 border-t-2 border-amber-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <div className="text-xl text-amber-950">QueueLess</div>
                <div className="text-xs text-amber-700">Smart Ordering System</div>
              </div>
            </div>
            <div className="flex gap-8 text-amber-700">
              <a href="#" className="hover:text-amber-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-900 transition-colors">Terms of Service</a>
              <button onClick={() => onNavigate('contact')} className="hover:text-amber-900 transition-colors">Contact</button>
            </div>
            <div className="text-amber-600">
              <p>&copy; 2025 QueueLess. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
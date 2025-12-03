import { ArrowRight, Smartphone, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type PageType = 'home' | 'pricing' | 'plan-detail';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-full mb-6 shadow-md border border-amber-200">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>The Future of Dining Experience</span>
            </div>
            <h1 className="text-5xl lg:text-7xl text-amber-950 mb-6">
              Scan. Order. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Enjoy.</span>
            </h1>
            <p className="text-xl text-amber-800 mb-8 leading-relaxed">
              Transform every table into a digital ordering station. Perfect for elegant restaurants and cozy cafes alike. 
              Give your customers the convenience they crave while boosting your efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => onNavigate('pricing')}
                className="px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                View Plan
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-amber-300 text-amber-900 rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl">
                Watch Demo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-amber-200">
              <div className="text-center">
                <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-amber-700 to-orange-700 mb-2">50%</div>
                <div className="text-sm text-amber-700">Faster Service</div>
              </div>
              <div className="text-center border-x-2 border-amber-200">
                <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-amber-700 to-orange-700 mb-2">30%</div>
                <div className="text-sm text-amber-700">More Orders</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-amber-700 to-orange-700 mb-2">95%</div>
                <div className="text-sm text-amber-700">Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl transform rotate-3 blur-sm opacity-20"></div>
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 p-2 shadow-2xl border-4 border-white">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1690264695884-f62022341c8f?w=800&h=800&fit=crop"
                alt="Customer scanning QR code at restaurant"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-2xl border-2 border-amber-200 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-amber-600 mb-1">Active Orders</div>
                  <div className="text-3xl text-amber-900">1,247</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl text-white">
              <div className="text-xs mb-1">Success Rate</div>
              <div className="text-2xl">98.5%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
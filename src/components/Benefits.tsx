import { TrendingUp, DollarSign, Heart, Zap, Coffee, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Increase Revenue',
    description: 'Serve more customers faster and encourage upsells with smart menu recommendations and visual appeal.',
    stat: '+30% Average Order Value',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Zap,
    title: 'Boost Efficiency',
    description: 'Reduce errors, eliminate wait times, and free up staff for better customer service and hospitality.',
    stat: '50% Faster Table Turnover',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Heart,
    title: 'Improve Satisfaction',
    description: 'Give customers control over their dining experience with contactless convenience and transparency.',
    stat: '95% Customer Approval',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: DollarSign,
    title: 'Lower Costs',
    description: 'Reduce printing costs, minimize staffing needs, and streamline operations for maximum profitability.',
    stat: '40% Less Operational Costs',
    gradient: 'from-blue-500 to-indigo-600',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-full mb-6 border-2 border-amber-200">
            Real Results
          </div>
          <h2 className="text-5xl text-amber-950 mb-6">Why Choose QueueLess</h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Transform your restaurant operations and deliver exceptional dining experiences. 
            Trusted by fine dining restaurants and cozy cafes worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-white to-amber-50/50 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="relative flex items-start gap-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl text-amber-950 mb-3">{benefit.title}</h3>
                    <p className="text-amber-800 mb-6 leading-relaxed">{benefit.description}</p>
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-xl border-2 border-amber-200 shadow-sm">
                      {benefit.stat}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional visual section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1761095596849-608b6a337c36?w=800&h=600&fit=crop"
              alt="Elegant restaurant dining"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/40 to-transparent flex items-end p-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-amber-900" />
                  </div>
                  <div className="text-white">Fine Dining</div>
                </div>
                <h3 className="text-3xl text-white mb-2">Perfect for Restaurants</h3>
                <p className="text-amber-100">Elevate your upscale dining experience with seamless technology</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1674482762136-3e613041b29a?w=800&h=600&fit=crop"
              alt="Cozy cafe atmosphere"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/40 to-transparent flex items-end p-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Coffee className="w-6 h-6 text-amber-900" />
                  </div>
                  <div className="text-white">Cafe Culture</div>
                </div>
                <h3 className="text-3xl text-white mb-2">Ideal for Cafes</h3>
                <p className="text-amber-100">Create a cozy, modern atmosphere your customers will love</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Scan, ShoppingCart, Wallet, ChefHat } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Customer Scans QR Code',
    description: 'Each table has a unique QR code. Customers scan it with their phone camera to access your digital menu instantly - no app download needed.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    icon: Scan,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    number: '02',
    title: 'Browse & Order',
    description: 'Customers browse the menu with beautiful food photos, read descriptions, add items to cart, customize their order, and submit when ready.',
    image: 'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?w=600&h=400&fit=crop',
    icon: ShoppingCart,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    number: '03',
    title: 'Select Payment Method',
    description: 'Choose to pay now with credit card or digital wallet for instant confirmation, or select cash payment when the delicious order arrives.',
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=600&h=400&fit=crop',
    icon: Wallet,
    color: 'from-green-500 to-emerald-600',
  },
  {
    number: '04',
    title: 'Kitchen Receives Order',
    description: 'Your kitchen gets instant notification with complete order details, table number, special requests, and payment status for seamless preparation.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop',
    icon: ChefHat,
    color: 'from-orange-500 to-red-600',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm text-amber-900 rounded-full mb-6 border-2 border-amber-300 shadow-lg">
            Simple Process
          </div>
          <h2 className="text-5xl text-amber-950 mb-6">How It Works</h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            A seamless experience from scan to delivery in just four simple steps. 
            Watch your restaurant transform into a modern, efficient operation.
          </p>
        </div>
        <div className="space-y-32">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center gap-4 mb-6 px-6 py-3 bg-gradient-to-r ${step.color} text-white rounded-2xl shadow-lg`}>
                    <Icon className="w-8 h-8" />
                    <span className="text-3xl">Step {step.number}</span>
                  </div>
                  <h3 className="text-4xl text-amber-950 mb-6">{step.title}</h3>
                  <p className="text-xl text-amber-800 leading-relaxed mb-8">{step.description}</p>
                  <div className="flex gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl`}></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                      <ImageWithFallback 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                        <span className="text-3xl">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
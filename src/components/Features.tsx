import { QrCode, Smartphone, CreditCard, Bell, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'QR Code Scanning',
    description: 'Customers simply scan the QR code at their table to access the digital menu instantly.',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    icon: Smartphone,
    title: 'Easy Ordering',
    description: 'Browse menu, customize items, and place orders directly from their smartphone.',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'Support for credit cards, digital wallets, and cash payment upon delivery.',
    gradient: 'from-green-500 to-emerald-700',
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Kitchen and staff receive instant notifications with table number and order details.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Clock,
    title: 'Faster Service',
    description: 'Reduce wait times and serve more customers with streamlined operations.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Users,
    title: 'Table Management',
    description: 'Automatic table tracking ensures orders reach the right customers every time.',
    gradient: 'from-pink-500 to-rose-700',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #d97706 35px, #d97706 36px)`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-full mb-6 border-2 border-amber-200">
            Why Choose Us
          </div>
          <h2 className="text-5xl text-amber-950 mb-6">Everything You Need</h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            A complete solution for modern restaurant ordering that delights customers and empowers staff. 
            From elegant fine dining to cozy neighborhood cafes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-amber-900 mb-3">{feature.title}</h3>
                <p className="text-amber-700 leading-relaxed">{feature.description}</p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full group-hover:w-full transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
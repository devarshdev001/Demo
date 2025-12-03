import { Check, Star, Sparkles, Crown, ArrowRight, Shield, Zap, Clock, HeadphonesIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact' | 'payment';

interface PlanDetailProps {
  onNavigate: (page: PageType, planName?: string, cycle?: 'monthly' | 'yearly') => void;
  planName: string;
}

const planData: Record<string, any> = {
  'Starter': {
    name: 'Starter',
    tagline: 'Perfect for Small Cafes',
    icon: Sparkles,
    monthlyPrice: 29,
    yearlyPrice: 278,
    description: 'Everything you need to get started with digital ordering for your cozy cafe',
    gradient: 'from-blue-500 to-cyan-600',
    features: [
      { name: 'Up to 10 tables', description: 'Manage orders from up to 10 tables simultaneously', included: true },
      { name: 'QR code generation', description: 'Unique QR codes for each table with custom designs', included: true },
      { name: 'Digital menu management', description: 'Easy-to-update menu with photos and descriptions', included: true },
      { name: 'Basic payment processing', description: 'Accept major credit cards and digital wallets', included: true },
      { name: 'Order notifications', description: 'Real-time email notifications for new orders', included: true },
      { name: 'Email support', description: 'Response within 24 hours on business days', included: true },
    ],
    highlights: [
      { icon: Zap, title: 'Quick Setup', description: 'Get started in less than 15 minutes' },
      { icon: Shield, title: 'Secure Payments', description: 'PCI-compliant payment processing' },
      { icon: Clock, title: 'Real-time Updates', description: 'Instant order notifications to your device' },
    ],
  },
  'Professional': {
    name: 'Professional',
    tagline: 'Best for Growing Restaurants',
    icon: Star,
    monthlyPrice: 79,
    yearlyPrice: 758,
    description: 'Advanced features and analytics to scale your restaurant operations',
    gradient: 'from-amber-500 to-orange-600',
    popular: true,
    features: [
      { name: 'Up to 50 tables', description: 'Manage orders from up to 50 tables simultaneously', included: true },
      { name: 'QR code generation', description: 'Unique QR codes for each table with custom designs', included: true },
      { name: 'Digital menu management', description: 'Advanced menu builder with categories and modifiers', included: true },
      { name: 'Basic payment processing', description: 'Accept major credit cards and digital wallets', included: true },
      { name: 'Order notifications', description: 'Real-time push notifications, SMS, and email alerts', included: true },
      { name: 'Email support', description: 'Priority support with 2-hour response time', included: true },
    ],
    highlights: [
      { icon: Zap, title: 'Advanced Features', description: 'Everything in Starter plus powerful tools' },
      { icon: Shield, title: 'Priority Support', description: 'Get help when you need it most' },
      { icon: Clock, title: 'Multi-location', description: 'Manage multiple locations effortlessly' },
    ],
  },
  'Enterprise': {
    name: 'Enterprise',
    tagline: 'For Large Restaurant Chains',
    icon: Crown,
    monthlyPrice: 199,
    yearlyPrice: 1910,
    description: 'Enterprise-grade features with dedicated support for large restaurant operations',
    gradient: 'from-purple-500 to-pink-600',
    features: [
      { name: 'Up to 100 tables', description: 'Manage orders from up to 100 tables simultaneously', included: true },
      { name: 'QR code generation', description: 'Advanced QR codes with analytics and tracking', included: true },
      { name: 'Digital menu management', description: 'Enterprise menu system with A/B testing', included: true },
      { name: 'Basic payment processing', description: 'Custom payment solutions and integrations', included: true },
      { name: 'Order notifications', description: 'Multi-channel notifications with customization', included: true },
      { name: 'Email support', description: 'Round-the-clock support with 30-min response time', included: true },
    ],
    highlights: [
      { icon: Zap, title: 'Enterprise Scale', description: 'Built for large restaurant chains' },
      { icon: Shield, title: 'Dedicated Support', description: 'Personal account manager included' },
      { icon: Clock, title: 'Custom Solutions', description: 'Tailored features for your needs' },
    ],
  },
};

export function PlanDetail({ onNavigate, planName }: PlanDetailProps) {
  const plan = planData[planName] || planData['Professional'];
  const Icon = plan.icon;
  const monthlySavings = Math.round((plan.monthlyPrice * 12 - plan.yearlyPrice) / 12);
  const yearlyDiscount = Math.round(((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) * 100);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${plan.gradient} text-white rounded-2xl mb-6 shadow-xl`}>
            <Icon className="w-8 h-8" />
            <span className="text-2xl">{plan.name} Plan</span>
          </div>
          <h1 className="text-4xl lg:text-6xl text-amber-950 mb-4">
            {plan.tagline}
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Pricing Cards - Monthly and Yearly */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Monthly Plan */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-amber-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className={`bg-gradient-to-br ${plan.gradient} p-10 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl">Monthly Plan</h3>
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <span className="text-sm">Flexible</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl">${plan.monthlyPrice}</span>
                  <span className="text-white/80 text-xl">/month</span>
                </div>
                <p className="text-white/90 text-lg">
                  Billed monthly. Cancel anytime.
                </p>
              </div>
            </div>
            <div className="p-10">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>No long-term commitment</span>
                </li>
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>30-day free trial included</span>
                </li>
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>All features included</span>
                </li>
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Cancel anytime</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('payment', planName, 'monthly')}
                className="w-full py-5 bg-white border-2 border-amber-300 text-amber-900 rounded-2xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-green-400 overflow-hidden relative hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-xl border-2 border-white">
                Save ${monthlySavings * 12}/year
              </div>
            </div>
            <div className={`bg-gradient-to-br from-green-600 to-emerald-700 p-10 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl">Yearly Plan</h3>
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <span className="text-sm">Best Value</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl">${plan.yearlyPrice}</span>
                  <span className="text-white/80 text-xl">/year</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl line-through text-white/60">${plan.monthlyPrice * 12}</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                    Save {yearlyDiscount}%
                  </span>
                </div>
                <p className="text-white/90 text-lg">
                  Just ${Math.round(plan.yearlyPrice / 12)}/month when billed annually.
                </p>
              </div>
            </div>
            <div className="p-10">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Save ${monthlySavings * 12} per year</span>
                </li>
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>30-day free trial included</span>
                </li>
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>All features included</span>
                </li>
                <li className="flex items-center gap-3 text-amber-900">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Priority onboarding</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('payment', planName, 'yearly')}
                className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-20">
          <h2 className="text-3xl text-amber-950 mb-8 text-center">What's Included</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plan.highlights.map((highlight: any, index: number) => {
              const HighlightIcon = highlight.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-amber-200">
                  <div className={`w-14 h-14 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                    <HighlightIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl text-amber-900 mb-2">{highlight.title}</h3>
                  <p className="text-amber-700">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border-2 border-amber-200 mb-20">
          <h2 className="text-3xl text-amber-950 mb-8 text-center">All Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {plan.features.map((feature: any, index: number) => (
              <div key={index} className="flex items-start gap-4">
                {feature.included ? (
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-400">—</span>
                  </div>
                )}
                <div>
                  <h3 className={`text-lg mb-1 ${feature.included ? 'text-amber-900' : 'text-gray-400'}`}>
                    {feature.name}
                  </h3>
                  <p className={`text-sm ${feature.included ? 'text-amber-700' : 'text-gray-400'}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-amber-900 via-orange-900 to-amber-950 rounded-3xl p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative text-center">
            <h2 className="text-4xl lg:text-5xl text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Start your 30-day free trial today. No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-12 py-5 bg-white text-amber-900 rounded-2xl hover:bg-amber-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg flex items-center justify-center gap-3">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className="px-12 py-5 border-2 border-white text-white rounded-2xl hover:bg-white/10 transition-all text-lg">
                Compare All Plans
              </button>
            </div>
            <p className="text-amber-200 text-sm">
              Need help choosing? <a href="#" className="underline hover:text-white">Contact our sales team</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
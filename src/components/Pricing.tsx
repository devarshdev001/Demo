import { Check, X, Star, Sparkles, Crown, Zap } from 'lucide-react';
import { useState } from 'react';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact' | 'payment';

interface PricingProps {
  onNavigate: (page: PageType, planName?: string, cycle?: 'monthly' | 'yearly') => void;
}

export function Pricing({ onNavigate }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? 29 : 278,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Perfect for small cafes',
      features: [
        { name: 'Up to 10 tables', included: true },
        { name: 'QR code generation', included: true },
        { name: 'Digital menu management', included: true },
        { name: 'Basic payment processing', included: true },
        { name: 'Order notifications', included: true },
        { name: 'Email support', included: true },
      ],
      icon: Sparkles,
      gradient: 'from-blue-500 to-cyan-600',
      popular: false,
    },
    {
      name: 'Professional',
      price: billingPeriod === 'monthly' ? 79 : 758,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Best for growing restaurants',
      features: [
        { name: 'Up to 50 tables', included: true },
        { name: 'QR code generation', included: true },
        { name: 'Digital menu management', included: true },
        { name: 'Basic payment processing', included: true },
        { name: 'Order notifications', included: true },
        { name: 'Email support', included: true },
      ],
      icon: Star,
      gradient: 'from-amber-500 to-orange-600',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 199 : 1910,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'For large restaurant chains',
      features: [
        { name: 'Up to 100 tables', included: true },
        { name: 'QR code generation', included: true },
        { name: 'Digital menu management', included: true },
        { name: 'Basic payment processing', included: true },
        { name: 'Order notifications', included: true },
        { name: 'Email support', included: true },
      ],
      icon: Crown,
      gradient: 'from-purple-500 to-pink-600',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-full mb-6 shadow-md border-2 border-amber-200">
            <Zap className="w-5 h-5 text-amber-600" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl lg:text-7xl text-amber-950 mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Start with a 30-day free trial. No credit card required. 
            Scale as you grow from a cozy cafe to a bustling restaurant chain.
          </p>
          <div className="mt-8 inline-flex items-center gap-4 p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-amber-200">
            <button 
              onClick={() => setBillingPeriod('monthly')}
              className={`px-8 py-3 rounded-xl transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-800 hover:text-amber-900'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingPeriod('yearly')}
              className={`px-8 py-3 rounded-xl transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-800 hover:text-amber-900'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = plan.price;
            const period = plan.period;
            const monthlySavings = billingPeriod === 'yearly' ? Math.round((plan.price * 12 - plan.price) / 12) : 0;
            
            return (
              <div
                key={index}
                className={`relative ${
                  plan.popular
                    ? 'lg:-mt-8 lg:mb-0'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full shadow-xl border-2 border-white">
                      Most Popular
                    </div>
                  </div>
                )}
                <div
                  className={`h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                    plan.popular ? 'border-amber-400 scale-105' : 'border-amber-200'
                  } ${plan.popular ? 'relative' : ''}`}
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-br ${plan.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    <div className="relative">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl mb-2">{plan.name}</h3>
                      <p className="text-white/90 mb-6">{plan.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl">${price}</span>
                        <span className="text-white/80">{period}</span>
                      </div>
                      {billingPeriod === 'yearly' && monthlySavings > 0 && (
                        <div className="mt-3 inline-block px-3 py-1 bg-green-500/90 text-white rounded-lg text-sm">
                          Save ${monthlySavings}/month
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          <span className={feature.included ? 'text-amber-900' : 'text-gray-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => onNavigate('plan-detail', plan.name, billingPeriod)}
                      className={`w-full py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700'
                          : 'bg-white border-2 border-amber-300 text-amber-900 hover:bg-amber-50'
                      }`}
                    >
                      View Plan
                    </button>
                    {billingPeriod === 'yearly' && (
                      <p className="text-center text-sm text-amber-700 mt-3">
                        Billed ${price} annually
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border-2 border-amber-200">
          <h2 className="text-4xl text-amber-950 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl text-amber-900 mb-3">Can I change plans later?</h3>
              <p className="text-amber-700 leading-relaxed">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-amber-900 mb-3">What payment methods do you accept?</h3>
              <p className="text-amber-700 leading-relaxed">
                We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-amber-900 mb-3">Is there a setup fee?</h3>
              <p className="text-amber-700 leading-relaxed">
                No! There are no setup fees, no hidden costs. Just simple, transparent monthly pricing.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-amber-900 mb-3">What happens after the trial?</h3>
              <p className="text-amber-700 leading-relaxed">
                After your 30-day trial, you'll be charged monthly. Cancel anytime with no penalties or commitments.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-amber-900 via-orange-900 to-amber-950 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl text-white mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
                Our team is here to help you choose the perfect plan for your restaurant or cafe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 bg-white text-amber-900 rounded-2xl hover:bg-amber-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  Schedule a Demo
                </button>
                <button className="px-10 py-5 border-2 border-white text-white rounded-2xl hover:bg-white/10 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
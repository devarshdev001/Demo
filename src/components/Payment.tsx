import { CreditCard, Lock, Check, Shield, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact' | 'payment';

interface UserSession {
  id: string;
  email: string;
  accessToken: string;
}

interface PaymentProps {
  onNavigate: (page: PageType) => void;
  planName: string;
  billingCycle: 'monthly' | 'yearly';
  userSession: UserSession | null;
}

// Plan pricing data
const planPrices: { [key: string]: { monthly: number; yearly: number } } = {
  'Starter': { monthly: 29, yearly: 278 }, // 20% discount on yearly
  'Professional': { monthly: 79, yearly: 758 },
  'Enterprise': { monthly: 199, yearly: 1910 },
};

const planFeatures: { [key: string]: string[] } = {
  'Starter': [
    'Up to 10 tables',
    'QR code generation',
    'Digital menu management',
    'Basic payment processing',
    'Order notifications',
    'Email support'
  ],
  'Professional': [
    'Up to 50 tables',
    'QR code generation',
    'Advanced menu management',
    'Multiple payment methods',
    'Real-time order tracking',
    'Priority email & chat support',
    'Analytics & reports',
    'Custom branding'
  ],
  'Enterprise': [
    'Up to 100 tables',
    'Everything in Professional',
    'Multi-location support',
    'Advanced analytics',
    'API access',
    'Dedicated account manager',
    '24/7 phone support',
    'Custom integrations'
  ],
};

export function Payment({ onNavigate, planName, billingCycle, userSession }: PaymentProps) {
  const [loading, setLoading] = useState(false);

  const price = planPrices[planName]?.[billingCycle] || 0;
  const features = planFeatures[planName] || [];
  const savingsPercent = billingCycle === 'yearly' ? 20 : 0;

  // Simulated payment processing (Replace this with real Razorpay integration later)
  const handlePayment = async () => {
    if (!userSession) {
      alert('Please login to continue with payment.');
      onNavigate('login');
      return;
    }

    setLoading(true);

    // Simulate payment processing delay
    setTimeout(() => {
      // Simulated successful payment
      const mockPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('Payment successful (simulated):', {
        paymentId: mockPaymentId,
        plan: planName,
        billingCycle,
        amount: price,
        userId: userSession.id,
        email: userSession.email,
      });

      alert(
        `✅ Payment Successful!\n\n` +
        `Payment ID: ${mockPaymentId}\n` +
        `Plan: ${planName} (${billingCycle})\n` +
        `Amount: $${price}\n\n` +
        `Welcome to QueueLess ${planName} plan!\n\n` +
        `(This is a simulated payment. Real Razorpay integration can be added later.)`
      );

      setLoading(false);
      
      // In production, you would:
      // 1. Verify payment on backend
      // 2. Activate user subscription
      // 3. Send confirmation email
      // 4. Redirect to dashboard
      
      onNavigate('home');
    }, 2000); // 2 second delay to simulate payment processing
  };

  /*
   * 🚀 HOW TO INTEGRATE RAZORPAY LATER:
   * ====================================
   * 
   * Step 1: Get Razorpay API Keys
   * - Sign up at https://razorpay.com/
   * - Get your Key ID from https://dashboard.razorpay.com/app/keys
   * - Use test keys for development, live keys for production
   * 
   * Step 2: Replace the handlePayment function above with this:
   * 
   * const handlePayment = async () => {
   *   if (!userSession) {
   *     alert('Please login to continue with payment.');
   *     onNavigate('login');
   *     return;
   *   }
   * 
   *   setLoading(true);
   * 
   *   try {
   *     // Step A: Create order on your backend first (IMPORTANT for security)
   *     const orderResponse = await fetch('YOUR_BACKEND_URL/create-order', {
   *       method: 'POST',
   *       headers: {
   *         'Content-Type': 'application/json',
   *         'Authorization': `Bearer ${userSession.accessToken}`
   *       },
   *       body: JSON.stringify({
   *         amount: price,
   *         currency: 'USD',
   *         plan: planName,
   *         billingCycle: billingCycle
   *       })
   *     });
   * 
   *     const { orderId } = await orderResponse.json();
   * 
   *     // Step B: Load Razorpay script
   *     const script = document.createElement('script');
   *     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
   *     script.async = true;
   *     document.body.appendChild(script);
   * 
   *     script.onload = () => {
   *       // Step C: Initialize Razorpay
   *       const options = {
   *         key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your key
   *         amount: price * 100, // Amount in smallest currency unit (cents/paise)
   *         currency: 'USD',
   *         name: 'QueueLess',
   *         description: `${planName} Plan - ${billingCycle === 'yearly' ? 'Annual' : 'Monthly'} Subscription`,
   *         order_id: orderId, // Order ID from backend
   *         handler: async function (response) {
   *           // Step D: Verify payment on backend
   *           const verifyResponse = await fetch('YOUR_BACKEND_URL/verify-payment', {
   *             method: 'POST',
   *             headers: {
   *               'Content-Type': 'application/json',
   *               'Authorization': `Bearer ${userSession.accessToken}`
   *             },
   *             body: JSON.stringify({
   *               razorpay_order_id: response.razorpay_order_id,
   *               razorpay_payment_id: response.razorpay_payment_id,
   *               razorpay_signature: response.razorpay_signature
   *             })
   *           });
   * 
   *           const verifyData = await verifyResponse.json();
   *           
   *           if (verifyData.success) {
   *             alert(`✅ Payment successful! Payment ID: ${response.razorpay_payment_id}`);
   *             onNavigate('home'); // or redirect to dashboard
   *           }
   *         },
   *         prefill: {
   *           email: userSession.email,
   *         },
   *         notes: {
   *           plan: planName,
   *           billing_cycle: billingCycle,
   *           user_id: userSession.id,
   *         },
   *         theme: {
   *           color: '#f59e0b', // Your brand color
   *         },
   *         modal: {
   *           ondismiss: function() {
   *             setLoading(false);
   *             console.log('Payment cancelled by user');
   *           }
   *         }
   *       };
   * 
   *       const razorpay = new window.Razorpay(options);
   *       razorpay.open();
   *       setLoading(false);
   *     };
   *   } catch (error) {
   *     console.error('Payment error:', error);
   *     alert('Failed to initialize payment. Please try again.');
   *     setLoading(false);
   *   }
   * };
   * 
   * Step 3: Backend Implementation (Node.js example)
   * Create these two endpoints on your backend:
   * 
   * // Create Order Endpoint
   * app.post('/create-order', async (req, res) => {
   *   const Razorpay = require('razorpay');
   *   const razorpay = new Razorpay({
   *     key_id: 'YOUR_KEY_ID',
   *     key_secret: 'YOUR_KEY_SECRET'
   *   });
   * 
   *   const options = {
   *     amount: req.body.amount * 100,
   *     currency: req.body.currency,
   *     receipt: `order_${Date.now()}`
   *   };
   * 
   *   const order = await razorpay.orders.create(options);
   *   res.json({ orderId: order.id });
   * });
   * 
   * // Verify Payment Endpoint
   * app.post('/verify-payment', async (req, res) => {
   *   const crypto = require('crypto');
   *   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
   * 
   *   const sign = razorpay_order_id + '|' + razorpay_payment_id;
   *   const expectedSign = crypto
   *     .createHmac('sha256', 'YOUR_KEY_SECRET')
   *     .update(sign.toString())
   *     .digest('hex');
   * 
   *   if (razorpay_signature === expectedSign) {
   *     // Payment verified successfully
   *     // Activate user subscription in database
   *     res.json({ success: true });
   *   } else {
   *     res.status(400).json({ success: false, message: 'Invalid signature' });
   *   }
   * });
   */

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl mb-6 shadow-xl">
            <CreditCard className="w-6 h-6" />
            <span className="text-xl">Secure Payment</span>
          </div>
          <h1 className="text-4xl lg:text-5xl text-amber-950 mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            You're one step away from transforming your restaurant with QueueLess
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Plan Summary */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-200 p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl text-amber-950">{planName} Plan</h2>
                {savingsPercent > 0 && (
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-xl">
                    Save {savingsPercent}%
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl text-amber-600">${price}</span>
                <span className="text-xl text-amber-700">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-sm text-amber-600 mt-2">
                  Billed annually · ${(price / 12).toFixed(2)}/month
                </p>
              )}
            </div>

            <div className="border-t-2 border-amber-200 pt-6 mb-6">
              <h3 className="text-xl text-amber-950 mb-4">Plan Features</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-amber-900">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-amber-950 mb-2">30-Day Money-Back Guarantee</h4>
                  <p className="text-sm text-amber-700">
                    If you're not completely satisfied, we'll refund your money within 30 days. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Payment Details */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-200 p-8">
            <h2 className="text-2xl text-amber-950 mb-6">Payment Details</h2>

            {/* User Info */}
            <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
              <p className="text-sm text-amber-700 mb-1">Logged in as:</p>
              <p className="text-amber-950">{userSession?.email}</p>
            </div>

            {/* Payment Summary */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-amber-900">
                <span>{planName} Plan ({billingCycle})</span>
                <span>${price}</span>
              </div>
              {savingsPercent > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Annual Discount ({savingsPercent}%)</span>
                  <span>-${(planPrices[planName].monthly * 12 - price).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t-2 border-amber-200 pt-4 flex justify-between text-xl text-amber-950">
                <span>Total</span>
                <span className="font-semibold">${price}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pay ${price} with Razorpay
                </>
              )}
            </button>

            {/* Security Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-amber-700">
                <Lock className="w-4 h-4" />
                <span>Secure 256-bit SSL encrypted payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-amber-700">
                <Shield className="w-4 h-4" />
                <span>PCI DSS compliant payment processing</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-amber-700">
                <Check className="w-4 h-4" />
                <span>Powered by Razorpay - Trusted by millions</span>
              </div>
            </div>

            {/* Info Note */}
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
              <p className="text-sm text-blue-800">
                💳 <strong>Test Mode:</strong> Use test card 4111 1111 1111 1111, any future expiry date, and any CVV for testing.
              </p>
            </div>

            {/* Cancel/Back */}
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full mt-4 py-3 border-2 border-amber-300 text-amber-900 rounded-xl hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pricing
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-sm text-amber-700">
          <p>
            By completing this purchase, you agree to our{' '}
            <a href="#" className="text-amber-600 hover:text-amber-800 underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-amber-600 hover:text-amber-800 underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
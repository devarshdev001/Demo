import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl: string;
  quantity: number;
}

interface CustomerCheckoutProps {
  cartItems: CartItem[];
  tableNumber: string;
  onBack: () => void;
  onOrderComplete: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'cash';

export function CustomerCheckout({ cartItems, tableNumber, onBack, onOrderComplete }: CustomerCheckoutProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [customerName, setCustomerName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order object
    const order = {
      id: `ORDER-${Date.now()}`,
      tableNumber,
      customerName,
      items: cartItems,
      subtotal,
      tax,
      total,
      paymentMethod: selectedPayment,
      specialInstructions,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    // Store order in localStorage (in a real app, this would go to a backend)
    const existingOrders = JSON.parse(localStorage.getItem('queueless_orders') || '[]');
    localStorage.setItem('queueless_orders', JSON.stringify([...existingOrders, order]));

    // Create notification for the kitchen staff
    const notification = {
      id: `NOTIF-${Date.now()}`,
      type: 'order',
      title: 'New Order Received',
      message: `${cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ')} ordered by ${customerName}`,
      time: 'Just now',
      read: false,
      tableNumber: tableNumber,
      timestamp: new Date().toISOString(),
      orderId: order.id,
    };

    // Store notification in localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('queueless_notifications') || '[]');
    localStorage.setItem('queueless_notifications', JSON.stringify([notification, ...existingNotifications]));

    setIsProcessing(false);
    setOrderPlaced(true);

    // Redirect after 3 seconds
    setTimeout(() => {
      onOrderComplete();
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center border-orange-200">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-orange-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-orange-700 mb-6">
            Your order has been sent to the kitchen. We'll notify you when it's ready.
          </p>
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-orange-600 mb-1">Order Total</p>
            <p className="text-2xl text-orange-900">${total.toFixed(2)}</p>
          </div>
          <p className="text-sm text-orange-600">Redirecting...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-orange-500/50 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-2xl">Checkout</h1>
          <p className="text-sm text-orange-100">Table: {tableNumber}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <Card className="p-6 border-orange-200">
              <h2 className="text-orange-900 mb-4">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-orange-700 mb-2">Name *</label>
                  <Input
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border-orange-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-orange-700 mb-2">Special Instructions</label>
                  <Textarea
                    placeholder="Any special requests? (e.g., allergies, preferences)"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="border-orange-200"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 border-orange-200">
              <h2 className="text-orange-900 mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedPayment('card')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-orange-200 hover:border-orange-300'
                  }`}
                >
                  <CreditCard className={`h-8 w-8 mx-auto mb-2 ${
                    selectedPayment === 'card' ? 'text-orange-600' : 'text-orange-400'
                  }`} />
                  <p className={`text-sm ${
                    selectedPayment === 'card' ? 'text-orange-900' : 'text-orange-600'
                  }`}>
                    Card
                  </p>
                </button>

                <button
                  onClick={() => setSelectedPayment('upi')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === 'upi'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-orange-200 hover:border-orange-300'
                  }`}
                >
                  <Wallet className={`h-8 w-8 mx-auto mb-2 ${
                    selectedPayment === 'upi' ? 'text-orange-600' : 'text-orange-400'
                  }`} />
                  <p className={`text-sm ${
                    selectedPayment === 'upi' ? 'text-orange-900' : 'text-orange-600'
                  }`}>
                    UPI
                  </p>
                </button>

                <button
                  onClick={() => setSelectedPayment('cash')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === 'cash'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-orange-200 hover:border-orange-300'
                  }`}
                >
                  <Banknote className={`h-8 w-8 mx-auto mb-2 ${
                    selectedPayment === 'cash' ? 'text-orange-600' : 'text-orange-400'
                  }`} />
                  <p className={`text-sm ${
                    selectedPayment === 'cash' ? 'text-orange-900' : 'text-orange-600'
                  }`}>
                    Cash
                  </p>
                </button>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6 border-orange-200">
              <h2 className="text-orange-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-orange-900">{item.name}</h3>
                          <Badge variant="outline" className="text-xs border-orange-300 text-orange-600 mt-1">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-900">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-orange-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Price Summary */}
          <div>
            <Card className="p-6 border-orange-200 sticky top-6">
              <h2 className="text-orange-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-orange-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-orange-700">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-orange-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-orange-900">Total</span>
                    <span className="text-orange-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>

              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-orange-600">
                  By placing this order, you agree to our terms and conditions.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
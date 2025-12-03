import { useState } from 'react';
import { CustomerMenu } from './CustomerMenu';
import { CustomerCheckout } from './CustomerCheckout';
import { Button } from './ui/button';
import { ArrowLeft, Eye } from 'lucide-react';

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

export function MenuPreview() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleProceedToCheckout = (items: CartItem[], _tableNumber: string) => {
    setCartItems(items);
    setShowCheckout(true);
  };

  const handleBackToMenu = () => {
    setShowCheckout(false);
  };

  const handleOrderComplete = () => {
    setShowCheckout(false);
    setCartItems([]);
  };

  return (
    <div>
      {/* Preview Header */}
      <div className="mb-6 bg-white rounded-xl shadow-sm border border-orange-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-orange-900">Menu Preview</h1>
            <p className="text-sm text-orange-600">
              This is what your customers will see when they scan the QR code
            </p>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
        {/* Mobile Frame Simulation */}
        <div className="max-w-md mx-auto">
          {!showCheckout ? (
            <CustomerMenu 
              tableNumber="Preview"
              onProceedToCheckout={handleProceedToCheckout}
            />
          ) : (
            <CustomerCheckout 
              cartItems={cartItems}
              tableNumber="Preview"
              onBack={handleBackToMenu}
              onOrderComplete={handleOrderComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

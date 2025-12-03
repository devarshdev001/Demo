import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, Plus, Minus, Search, Store, ChefHat, UtensilsCrossed, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CustomerMenuProps {
  tableNumber: string;
  onProceedToCheckout: (cartItems: CartItem[], tableNumber: string) => void;
}

export function CustomerMenu({ tableNumber, onProceedToCheckout }: CustomerMenuProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load menu items from localStorage
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const stored = localStorage.getItem('queueless_menu_items');
        if (stored) {
          const items = JSON.parse(stored);
          const availableItems = items.filter((item: MenuItem) => item.available);
          
          if (availableItems.length === 0) {
            // If no available items, still show the menu items but mark them unavailable
            if (items.length > 0) {
              setError('All menu items are currently unavailable');
              setMenuItems(items);
            } else {
              setError('No menu items available at the moment');
            }
          } else {
            setMenuItems(availableItems);
          }
        } else {
          // Default menu items if none exist - restaurant hasn't set up menu yet
          const defaultItems = [
            {
              id: '1',
              name: 'Cappuccino',
              description: 'Rich espresso with steamed milk and foam',
              price: 5.00,
              category: 'Beverages',
              available: true,
              imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop',
            },
            {
              id: '2',
              name: 'Margherita Pizza',
              description: 'Fresh mozzarella, tomatoes, and basil',
              price: 15.00,
              category: 'Main Course',
              available: true,
              imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
            },
            {
              id: '3',
              name: 'Caesar Salad',
              description: 'Crisp romaine, parmesan, croutons, caesar dressing',
              price: 10.00,
              category: 'Appetizers',
              available: true,
              imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
            },
            {
              id: '4',
              name: 'Chocolate Lava Cake',
              description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
              price: 8.00,
              category: 'Desserts',
              available: true,
              imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
            },
            {
              id: '5',
              name: 'Fresh Lemonade',
              description: 'Homemade lemonade with fresh lemons and mint',
              price: 4.00,
              category: 'Beverages',
              available: true,
              imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=400&h=300&fit=crop',
            },
            {
              id: '6',
              name: 'Grilled Chicken Sandwich',
              description: 'Juicy grilled chicken with lettuce, tomato, and special sauce',
              price: 12.00,
              category: 'Main Course',
              available: true,
              imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
            },
          ];
          setMenuItems(defaultItems);
          // Save default items to localStorage so they persist
          localStorage.setItem('queueless_menu_items', JSON.stringify(defaultItems));
        }
      } catch (err) {
        console.error('Error loading menu:', err);
        setError('Failed to load menu. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMenu();
  }, []);

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Hero/Welcome Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <UtensilsCrossed className="h-32 w-32" />
          </div>
          <div className="absolute bottom-10 right-10">
            <ChefHat className="h-40 w-40" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="h-48 w-48" />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                <span className="text-sm">Table: {tableNumber}</span>
              </div>
            </div>
            <h1 className="text-4xl mb-3">Welcome to QueueLess</h1>
            <p className="text-orange-100 max-w-2xl mx-auto text-lg">
              Order from your table with ease. Browse our menu, add items to cart, and enjoy contactless ordering.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <ChefHat className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm text-orange-100">Fresh</p>
              <p className="text-xs text-orange-200">Made Daily</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm text-orange-100">Fast</p>
              <p className="text-xs text-orange-200">Quick Service</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Sparkles className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm text-orange-100">Quality</p>
              <p className="text-xs text-orange-200">Best Ingredients</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-600" />
            <Input
              type="text"
              placeholder="Search for dishes, drinks, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 bg-white border-none shadow-lg rounded-xl text-orange-900 placeholder:text-orange-400"
            />
          </div>
          
          {/* Cart Button for Mobile */}
          {totalItems > 0 && (
            <div className="mt-6 text-center md:hidden">
              <Button
                onClick={() => onProceedToCheckout(cart, tableNumber)}
                className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                View Cart ({totalItems}) · ${totalPrice.toFixed(2)}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Error State */}
        {error && (
          <Card className="p-12 text-center border-red-200 bg-red-50 mb-8">
            <div className="bg-red-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-red-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              Reload Page
            </Button>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-orange-200 bg-white">
                <Skeleton className="h-52 w-full bg-orange-200" />
                <div className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-orange-200" />
                  <Skeleton className="h-4 w-full mb-2 bg-orange-100" />
                  <Skeleton className="h-4 w-5/6 mb-4 bg-orange-100" />
                  <Skeleton className="h-10 w-full bg-orange-200" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Menu Items */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {filteredItems.map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <Card key={item.id} className="overflow-hidden border-orange-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white">
                  <div className="relative h-52 overflow-hidden group">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg px-3 py-1">
                        ${item.price.toFixed(2)}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs border-orange-300 text-orange-700">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-orange-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-orange-700 mb-4 line-clamp-2">{item.description}</p>
                    
                    {quantity === 0 ? (
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-md"
                        size="lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between gap-3">
                        <Button
                          onClick={() => removeFromCart(item.id)}
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 text-center bg-orange-50 rounded-lg py-2">
                          <span className="text-orange-900">{quantity} in cart</span>
                        </div>
                        <Button
                          onClick={() => addToCart(item)}
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && !error && filteredItems.length === 0 && (
          <Card className="p-12 text-center border-orange-200 bg-white">
            <div className="bg-orange-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-orange-500" />
            </div>
            <h3 className="text-orange-900 mb-2">No items found</h3>
            <p className="text-orange-700">Try adjusting your search or browse different categories</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              variant="outline"
              className="mt-4 border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>

      {/* Floating Cart Summary - Enhanced */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-2xl border-t-4 border-orange-400 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-orange-100">{totalItems} item{totalItems !== 1 ? 's' : ''} added</p>
                  <p className="text-2xl">${totalPrice.toFixed(2)}</p>
                </div>
              </div>
              <Button
                onClick={() => onProceedToCheckout(cart, tableNumber)}
                className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
                size="lg"
              >
                Proceed to Checkout
                <ShoppingCart className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Category Navbar */}
      {!isLoading && !error && (
        <div 
          className={`fixed left-0 right-0 bg-white border-t-2 border-orange-200 shadow-2xl z-40 transition-all duration-300 ${
            totalItems > 0 ? 'bottom-20' : 'bottom-0'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-1">
              <div className="flex items-center gap-2 flex-shrink-0">
                <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                <span className="text-sm text-orange-700">Categories</span>
              </div>
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`whitespace-nowrap flex-shrink-0 h-12 px-6 ${selectedCategory === category 
                    ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg border-none"
                    : "border-orange-300 text-orange-700 hover:bg-orange-50 bg-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
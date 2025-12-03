import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, CheckCircle, XCircle, Package, DollarSign, User, Table } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  specialInstructions: string;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  timestamp: string;
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'completed'>('all');

  // Load orders from localStorage
  useEffect(() => {
    loadOrders();
    
    // Set up interval to check for new orders
    const interval = setInterval(loadOrders, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const stored = localStorage.getItem('queueless_orders');
    if (stored) {
      const parsedOrders = JSON.parse(stored);
      // Sort by timestamp, newest first
      parsedOrders.sort((a: Order, b: Order) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setOrders(parsedOrders);
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('queueless_orders', JSON.stringify(updatedOrders));
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'preparing':
        return <Package className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-orange-900 mb-2">Orders</h1>
          <p className="text-orange-700">Manage incoming customer orders</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'pending', label: 'Pending' },
          { key: 'preparing', label: 'Preparing' },
          { key: 'completed', label: 'Completed' },
        ].map(({ key, label }) => (
          <Button
            key={key}
            onClick={() => setFilter(key as typeof filter)}
            variant={filter === key ? 'default' : 'outline'}
            className={filter === key 
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
              : 'border-orange-300 text-orange-700 hover:bg-orange-50'
            }
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-6 border-orange-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-orange-900">{order.id}</h3>
                  <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Table className="h-4 w-4" />
                    <span>Table: {order.tableNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700">
                    <User className="h-4 w-4" />
                    <span>{order.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(order.timestamp)} at {formatTime(order.timestamp)}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Total</span>
                </div>
                <p className="text-2xl text-orange-900">${order.total.toFixed(2)}</p>
                <p className="text-xs text-orange-600 capitalize">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-orange-600 mb-2">Order Items</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded min-w-[32px] text-center">
                        {item.quantity}x
                      </span>
                      <span className="text-orange-900">{item.name}</span>
                    </div>
                    <span className="text-orange-700">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {order.specialInstructions && (
                <div className="mt-3 pt-3 border-t border-orange-200">
                  <p className="text-xs text-orange-600 mb-1">Special Instructions:</p>
                  <p className="text-sm text-orange-800 italic">{order.specialInstructions}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Start Preparing
                    </Button>
                    <Button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
                
                {order.status === 'preparing' && (
                  <>
                    <Button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                    <Button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center border-orange-200">
          <Package className="h-16 w-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-orange-900 mb-2">No Orders Yet</h3>
          <p className="text-orange-700">
            {filter === 'all' 
              ? 'Orders from customers will appear here'
              : `No ${filter} orders at the moment`
            }
          </p>
        </Card>
      )}
    </div>
  );
}

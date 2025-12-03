import { Card } from './ui/card';
import { TrendingUp, ShoppingCart, DollarSign, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export function DashboardOverview() {
  // State for real-time statistics
  const [stats, setStats] = useState(() => {
    // Get initial active tables count from localStorage
    const getActiveTablesCount = () => {
      const stored = localStorage.getItem('queueless_qr_codes');
      if (stored) {
        return JSON.parse(stored).length;
      }
      return 4; // Default count
    };

    return {
      totalOrders: 1284,
      revenue: 45231,
      activeTables: getActiveTablesCount(),
      growth: 23,
    };
  });

  // State for monthly comparison (previous month data)
  const [previousMonthStats] = useState(() => {
    // Calculate previous month's active tables (slightly lower)
    const currentTables = stats.activeTables;
    return {
      totalOrders: 1142,
      revenue: 41723,
      activeTables: Math.max(1, currentTables - 2), // 2 fewer tables last month
      growth: 19.9,
    };
  });

  // Listen for QR code changes
  useEffect(() => {
    const handleQRCodeUpdate = () => {
      const stored = localStorage.getItem('queueless_qr_codes');
      if (stored) {
        const qrCodes = JSON.parse(stored);
        setStats(prev => ({
          ...prev,
          activeTables: qrCodes.length,
        }));
      } else {
        setStats(prev => ({
          ...prev,
          activeTables: 0,
        }));
      }
    };

    // Listen for custom event
    window.addEventListener('qr-codes-updated', handleQRCodeUpdate);
    
    // Also listen for storage events (for cross-tab updates)
    window.addEventListener('storage', (e) => {
      if (e.key === 'queueless_qr_codes') {
        handleQRCodeUpdate();
      }
    });

    return () => {
      window.removeEventListener('qr-codes-updated', handleQRCodeUpdate);
      window.removeEventListener('storage', handleQRCodeUpdate);
    };
  }, []);

  // Simulate real-time order updates
  useEffect(() => {
    // Simulate new orders coming in every 5-15 seconds
    const orderInterval = setInterval(() => {
      // Random chance of getting a new order (70% chance)
      if (Math.random() > 0.3) {
        setStats(prev => {
          // Average order value between $15-$50
          const orderValue = Math.floor(Math.random() * 35) + 15;
          
          return {
            ...prev,
            totalOrders: prev.totalOrders + 1,
            revenue: prev.revenue + orderValue,
          };
        });
      }
    }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds

    return () => clearInterval(orderInterval);
  }, []);

  // Calculate growth percentage in real-time based on current vs previous month
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setStats(prev => {
        // Calculate growth based on revenue and orders
        const revenueGrowth = ((prev.revenue - previousMonthStats.revenue) / previousMonthStats.revenue) * 100;
        const orderGrowth = ((prev.totalOrders - previousMonthStats.totalOrders) / previousMonthStats.totalOrders) * 100;
        
        // Average growth metric
        const calculatedGrowth = ((revenueGrowth + orderGrowth) / 2).toFixed(1);
        
        return {
          ...prev,
          growth: parseFloat(calculatedGrowth),
        };
      });
    }, 10000); // Recalculate every 10 seconds

    return () => clearInterval(growthInterval);
  }, [previousMonthStats]);

  // Calculate percentage changes vs previous month
  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: change.toFixed(1),
      isPositive: change >= 0,
    };
  };

  const ordersChange = calculateChange(stats.totalOrders, previousMonthStats.totalOrders);
  const revenueChange = calculateChange(stats.revenue, previousMonthStats.revenue);
  const tablesChange = calculateChange(stats.activeTables, previousMonthStats.activeTables);
  const growthChange = calculateChange(stats.growth, previousMonthStats.growth);

  const statsDisplay = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: ordersChange,
      icon: ShoppingCart,
      color: 'from-orange-500 to-amber-600',
      description: 'Orders this month',
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: revenueChange,
      icon: DollarSign,
      color: 'from-amber-500 to-orange-600',
      description: 'Total earnings',
    },
    {
      title: 'Active Tables',
      value: stats.activeTables.toString(),
      change: tablesChange,
      icon: Users,
      color: 'from-orange-600 to-red-600',
      description: 'Currently occupied',
    },
    {
      title: 'Growth',
      value: `${stats.growth}%`,
      change: growthChange,
      icon: TrendingUp,
      color: 'from-amber-600 to-orange-500',
      description: 'Monthly growth rate',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-orange-900 mb-2">Dashboard Overview</h1>
        <p className="text-orange-700">Welcome back! Here's what's happening with your restaurant today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 border-orange-200 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              {/* Subtle animation indicator for real-time updates */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" 
                   title="Live updating" />
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-orange-600 mb-1">{stat.title}</p>
                  <h3 className="text-orange-900">{stat.value}</h3>
                  <p className="text-xs text-orange-500 mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export function OrderStatistics() {
  // Mock data for most ordered food items
  const mostOrderedItems = [
    { name: 'Cappuccino', orders: 245, revenue: 1225 },
    { name: 'Caesar Salad', orders: 189, revenue: 1890 },
    { name: 'Margherita Pizza', orders: 167, revenue: 2505 },
    { name: 'Burger & Fries', orders: 156, revenue: 1872 },
    { name: 'Pasta Carbonara', orders: 134, revenue: 1876 },
    { name: 'Latte', orders: 128, revenue: 640 },
    { name: 'Club Sandwich', orders: 98, revenue: 1176 },
    { name: 'Greek Salad', orders: 87, revenue: 783 },
  ];

  // Data for order trends over the week
  const weeklyTrends = [
    { day: 'Mon', orders: 145, revenue: 4350 },
    { day: 'Tue', orders: 167, revenue: 5010 },
    { day: 'Wed', orders: 189, revenue: 5670 },
    { day: 'Thu', orders: 198, revenue: 5940 },
    { day: 'Fri', orders: 234, revenue: 7020 },
    { day: 'Sat', orders: 289, revenue: 8670 },
    { day: 'Sun', orders: 256, revenue: 7680 },
  ];

  // Data for category distribution
  const categoryData = [
    { name: 'Beverages', value: 35, color: '#f97316' },
    { name: 'Main Course', value: 40, color: '#fb923c' },
    { name: 'Appetizers', value: 15, color: '#fdba74' },
    { name: 'Desserts', value: 10, color: '#fed7aa' },
  ];

  const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa'];

  return (
    <div className="space-y-6">
      {/* Most Ordered Items - Bar Chart */}
      <Card className="p-6 border-orange-200">
        <h3 className="text-orange-900 mb-6">Most Ordered Items</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mostOrderedItems}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fill: '#9a3412' }}
            />
            <YAxis tick={{ fill: '#9a3412' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #fed7aa',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="orders" fill="#f97316" name="Total Orders" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends - Line Chart */}
        <Card className="p-6 border-orange-200">
          <h3 className="text-orange-900 mb-6">Weekly Order Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="day" tick={{ fill: '#9a3412' }} />
              <YAxis tick={{ fill: '#9a3412' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #fed7aa',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#f97316" 
                strokeWidth={3}
                name="Orders"
                dot={{ fill: '#f97316', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution - Pie Chart */}
        <Card className="p-6 border-orange-200">
          <h3 className="text-orange-900 mb-6">Order Distribution by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Items Table */}
      <Card className="p-6 border-orange-200">
        <h3 className="text-orange-900 mb-6">Top Performing Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-orange-200">
                <th className="text-left py-3 px-4 text-orange-900">Rank</th>
                <th className="text-left py-3 px-4 text-orange-900">Item Name</th>
                <th className="text-right py-3 px-4 text-orange-900">Orders</th>
                <th className="text-right py-3 px-4 text-orange-900">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {mostOrderedItems.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-orange-100 hover:bg-orange-50 transition-colors">
                  <td className="py-3 px-4 text-orange-800">#{index + 1}</td>
                  <td className="py-3 px-4 text-orange-900">{item.name}</td>
                  <td className="text-right py-3 px-4 text-orange-800">{item.orders}</td>
                  <td className="text-right py-3 px-4 text-orange-800">${item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

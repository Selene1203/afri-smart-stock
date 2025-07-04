import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Package } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const salesTrendData = [
  { month: "Jan", sales: 248320, growth: 12.4 },
  { month: "Feb", sales: 265450, growth: 15.2 },
  { month: "Mar", sales: 290180, growth: 18.1 },
  { month: "Apr", sales: 275620, growth: 8.7 },
  { month: "May", sales: 312890, growth: 22.3 },
  { month: "Jun", sales: 298470, growth: 16.8 },
];

const topProducts = [
  { name: "Paracetamol", sales: 45, value: "M1,080" },
  { name: "Amoxicillin", sales: 38, value: "M1,349" },
  { name: "Vitamin C", sales: 32, value: "M600" },
  { name: "Ibuprofen", sales: 28, value: "M1,162" },
  { name: "Cough Syrup", sales: 24, value: "M720" },
];

const categoryData = [
  { name: "Prescription", value: 45, color: "#3B82F6" },
  { name: "OTC", value: 30, color: "#06B6D4" },
  { name: "Vitamins", value: 15, color: "#8B5CF6" },
  { name: "Others", value: 10, color: "#EC4899" },
];

const SalesInsights = () => {
  const currentMonth = salesTrendData[salesTrendData.length - 1];
  const previousMonth = salesTrendData[salesTrendData.length - 2];
  const monthlyGrowth = ((currentMonth.sales - previousMonth.sales) / previousMonth.sales * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Insights</h1>
        <p className="text-gray-600">Monthly Sales Trend - Last 6 months</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">M{currentMonth.sales.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+{monthlyGrowth}%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-2xl font-bold text-green-600">+{currentMonth.growth}%</p>
                <p className="text-sm text-gray-500">vs last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Average</p>
                <p className="text-2xl font-bold">M{(currentMonth.sales / 30).toLocaleString()}</p>
                <p className="text-sm text-gray-500">M8,277</p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            AI-Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Sales Performance</h4>
              <p className="text-blue-800">
                Sales of cold medications have increased by 27% this week, suggesting a seasonal illness outbreak. 
                Consider increasing stock levels.
              </p>
              <button className="text-blue-600 text-sm hover:underline mt-2">
                View suggestions
              </button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Revenue Growth</h4>
              <p className="text-green-800">
                Your revenue has grown consistently over the past 3 months. Paracetamol and Amoxicillin 
                are your top performers with 12% monthly growth.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <p className="text-sm text-gray-600">This month</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.value}</p>
                    <p className="text-sm text-gray-500">{product.sales} units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm">{category.name} ({category.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesInsights;

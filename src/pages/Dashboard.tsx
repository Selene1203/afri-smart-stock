
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, TrendingUp, TrendingDown, ShoppingCart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const inventoryData = [
  { name: "Prescription", value: 328, color: "#3B82F6" },
  { name: "OTC Medicines", value: 356, color: "#06B6D4" },
  { name: "First Aid", value: 124, color: "#8B5CF6" },
  { name: "Baby Care", value: 98, color: "#EC4899" },
];

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
];

const criticalItems = [
  { name: "Amoxicillin 500mg", status: "Out of stock", level: "critical" },
  { name: "Paracetamol 500mg", status: "Low stock (5 units)", level: "warning" },
  { name: "Insulin Novomix", status: "Low stock (3 units)", level: "warning" },
  { name: "Ventolin Inhaler", status: "Out of stock", level: "critical" },
];

const Dashboard = () => {
  const totalItems = inventoryData.reduce((sum, item) => sum + item.value, 0);
  const lowStockCount = 32;
  const outOfStockCount = 8;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory Dashboard</h1>
        <p className="text-gray-600">Updated 10 min ago</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems.toLocaleString()}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-orange-600">{lowStockCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                <p className="text-2xl font-bold text-green-600">₽5,500</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>View All</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-gray-600">{category.value} items</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Critical Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Critical Items</CardTitle>
            <CardDescription>AI Suggestions</CardDescription>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Sales Insights
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.level === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                  }`} />
                  <span className="font-medium">{item.name}</span>
                  <Badge variant={item.level === 'critical' ? 'destructive' : 'secondary'}>
                    {item.status}
                  </Badge>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Reorder
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <Package className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Sales</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <Package className="w-5 h-5" />
            <span className="text-xs">Inventory</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">AI Assistant</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

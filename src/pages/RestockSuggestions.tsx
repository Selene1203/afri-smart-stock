
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const suggestions = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    currentStock: 8,
    suggestedOrder: 32,
    reason: "Sales increased by 35% this month",
    priority: "high",
    trend: "up"
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    currentStock: 15,
    suggestedOrder: 25,
    reason: "Seasonal demand increase expected",
    priority: "medium",
    trend: "up"
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    currentStock: 5,
    suggestedOrder: 30,
    reason: "High demand due to flu season",
    priority: "high",
    trend: "up"
  },
  {
    id: 4,
    name: "Ibuprofen 400mg",
    currentStock: 12,
    suggestedOrder: 20,
    reason: "Consistent sales pattern detected",
    priority: "medium",
    trend: "stable"
  },
  {
    id: 5,
    name: "Allergy Relief Tablets",
    currentStock: 3,
    suggestedOrder: 25,
    reason: "Low stock alert",
    priority: "urgent",
    trend: "down"
  }
];

const RestockSuggestions = () => {
  const { toast } = useToast();

  const handleAddToOrder = (item: typeof suggestions[0]) => {
    toast({
      title: "Added to order",
      description: `${item.suggestedOrder} boxes of ${item.name} added to restock order`,
    });
  };

  const handleDismiss = (item: typeof suggestions[0]) => {
    toast({
      title: "Suggestion dismissed",
      description: `${item.name} restock suggestion has been dismissed`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Restocking Suggestions</h1>
          <p className="text-gray-600">5 items to restock</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          View Inventory Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Based on your sales data and current inventory levels, we recommend restocking the following items to maintain optimal stock levels.
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {suggestions.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {getTrendIcon(item.trend)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{item.reason}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-500">Current stock:</span>
                        <span className="font-medium ml-2">{item.currentStock} boxes</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Suggested order:</span>
                        <span className="font-bold text-blue-600 ml-2">{item.suggestedOrder} boxes</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleAddToOrder(item)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Add to Order
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleDismiss(item)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RestockSuggestions;

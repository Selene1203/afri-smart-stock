
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Scan, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quickProducts = [
  { id: 1, name: "Paracetamol", price: 24.00, image: "/placeholder.svg", sku: "MED-1234" },
  { id: 2, name: "Amoxicillin", price: 35.50, image: "/placeholder.svg", sku: "MED-5678" },
  { id: 3, name: "Vitamin C", price: 18.75, image: "/placeholder.svg", sku: "VIT-9012" },
  { id: 4, name: "Ibuprofen", price: 41.50, image: "/placeholder.svg", sku: "MED-3456" },
];

const SalesEntry = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Paracetamol 500mg", sku: "MED-1234", price: 24.00, quantity: 2 },
    { id: 2, name: "Amoxicillin 250mg", sku: "MED-5678", price: 35.50, quantity: 1 },
    { id: 3, name: "Vitamin C 1000mg", sku: "VIT-9012", price: 18.75, quantity: 1 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const addToCart = (product: typeof quickProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast({
      title: "Added to sale",
      description: `${product.name} added to current sale`,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const completeSale = () => {
    toast({
      title: "Sale completed!",
      description: `Total: ₽${total.toFixed(2)} - Payment processed successfully`,
    });
    setCart([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Entry</h1>
        <p className="text-gray-600">Add new sales to the system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Sale */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Sale
              <Badge className="bg-blue-100 text-blue-700">S-2025-0458</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <span className="font-medium">₽{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₽{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={completeSale}
              >
                <Scan className="w-4 h-4 mr-2" />
                Scan Barcode
              </Button>
              <Button variant="outline" className="flex-1">
                Manual Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Search & Quick Add */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Add Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickProducts.map((product) => (
                <div 
                  key={product.id}
                  className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => addToCart(product)}
                >
                  <div className="w-full h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image</span>
                  </div>
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.sku}</p>
                  <p className="font-bold text-blue-600">₽{product.price.toFixed(2)}</p>
                  <Button size="sm" className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Inventory Dashboard
              </Button>
              <Button variant="outline" className="flex-1">
                Cancel Sale
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesEntry;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Package, TrendingUp, ShoppingCart, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { triggerMakeWebhook } from "@/utils/webhook";

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Package, label: "Inventory", action: "check inventory" },
  { icon: TrendingUp, label: "Sales", action: "show sales" },
  { icon: ShoppingCart, label: "Forecast", action: "forecast demand" },
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your Yarona Pharmacy AI assistant. How can I help you with inventory, sales, or forecasts today?",
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'user',
      content: "Can you check if we're running low on any antibiotics?",
      timestamp: new Date()
    },
    {
      id: 3,
      type: 'assistant',
      content: "I've analyzed your inventory. You're running low on Amoxicillin (15 units) and Azithromycin (8 units). Both are below your set threshold of 20 units. Would you like me to prepare a restock order?",
      timestamp: new Date()
    },
    {
      id: 4,
      type: 'user',
      content: "Yes, please. Also, how were our sales for antibiotics last month?",
      timestamp: new Date()
    },
    {
      id: 5,
      type: 'assistant',
      content: "I've prepared a restock order. For last month's sales, antibiotics generated M15,420 in revenue, up 12% from the previous month. Amoxicillin was your top seller with 78 units sold.\n\nWould you like to see detailed sales analytics for antibiotics? I can prepare a report or you can check the Dashboard for a quick overview.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("dln86hzrhd5fft2nwsuvyuv5p0oygpi5@hook.eu2.make.com");
  const [showWebhookSettings, setShowWebhookSettings] = useState(false);
  const [isWebhookLoading, setIsWebhookLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Trigger webhook for AI interactions
    if (webhookUrl) {
      try {
        await triggerMakeWebhook(`https://${webhookUrl}`, {
          event: "ai_interaction",
          user_message: content,
          user_id: "user_001", // Replace with actual user ID
        });
      } catch (error) {
        console.error("Webhook trigger failed:", error);
      }
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateAIResponse(content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const triggerWebhookManually = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Make.com webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsWebhookLoading(true);
    try {
      await triggerMakeWebhook(`https://${webhookUrl}`, {
        event: "manual_trigger",
        user_id: "user_001",
        trigger_source: "ai_assistant",
        data: {
          current_inventory_items: 1247,
          low_stock_items: 32,
          out_of_stock_items: 8,
        }
      });

      toast({
        title: "Webhook Triggered",
        description: "Your Make.com automation has been triggered successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger webhook. Please check your URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsWebhookLoading(false);
    }
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('inventory') || lowerInput.includes('stock')) {
      return "I've checked your current inventory. You have 1,247 total items across all categories. 32 items are running low, and 8 are out of stock. Would you like me to show you the critical items that need immediate attention?";
    }
    
    if (lowerInput.includes('sales') || lowerInput.includes('revenue')) {
      return "Your current month's sales are performing well! Total revenue is M298,470 with a 16.8% growth rate. Top performers are Paracetamol (45 units) and Amoxicillin (38 units). Would you like a detailed breakdown?";
    }
    
    if (lowerInput.includes('restock') || lowerInput.includes('order')) {
      return "Based on your sales patterns and current stock levels, I recommend restocking 5 items. The most urgent are Paracetamol (32 boxes needed) and Vitamin C (30 bottles needed). Shall I add these to your order list?";
    }
    
    if (lowerInput.includes('forecast') || lowerInput.includes('predict')) {
      return "Based on historical data and seasonal trends, I predict a 23% increase in cold medication sales over the next two weeks. I recommend increasing stock for Paracetamol, cough syrups, and vitamin C supplements.";
    }
    
    return "I understand you're asking about your pharmacy operations. I can help you with inventory checks, sales analysis, restocking suggestions, and demand forecasting. What specific information would you like me to provide?";
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center gap-2"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowWebhookSettings(!showWebhookSettings)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Webhook
          </Button>
        </div>
      </div>

      {showWebhookSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Make.com Webhook Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Webhook URL</label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="your-webhook-id@hook.eu2.make.com"
                className="mb-2"
              />
              <p className="text-xs text-gray-500">
                Enter your Make.com webhook URL (without https://)
              </p>
            </div>
            <Button
              onClick={triggerWebhookManually}
              disabled={isWebhookLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isWebhookLoading ? "Triggering..." : "Test Webhook"}
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              className="flex-1"
            />
            <Button 
              onClick={() => sendMessage(inputValue)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;

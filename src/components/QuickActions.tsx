
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, ShoppingCart, Settings } from "lucide-react";

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
  onToggleWebhookSettings: () => void;
}

const quickActions = [
  { icon: Package, label: "Inventory", action: "check inventory" },
  { icon: TrendingUp, label: "Sales", action: "show sales" },
  { icon: ShoppingCart, label: "Forecast", action: "forecast demand" },
];

const QuickActions = ({ onQuickAction, onToggleWebhookSettings }: QuickActionsProps) => {
  return (
    <div className="flex gap-2">
      {quickActions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onQuickAction(action.action)}
          className="flex items-center gap-2"
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleWebhookSettings}
        className="flex items-center gap-2"
      >
        <Settings className="w-4 h-4" />
        Webhook
      </Button>
    </div>
  );
};

export default QuickActions;

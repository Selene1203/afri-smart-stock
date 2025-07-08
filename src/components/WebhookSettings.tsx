
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { triggerMakeWebhook } from "@/utils/webhook";

interface WebhookSettingsProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  showWebhookSettings: boolean;
}

const WebhookSettings = ({ webhookUrl, setWebhookUrl, showWebhookSettings }: WebhookSettingsProps) => {
  const [isWebhookLoading, setIsWebhookLoading] = useState(false);
  const { toast } = useToast();

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

  if (!showWebhookSettings) return null;

  return (
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
  );
};

export default WebhookSettings;

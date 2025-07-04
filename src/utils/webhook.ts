
export const triggerMakeWebhook = async (webhookUrl: string, data: any) => {
  try {
    console.log("Triggering Make.com webhook:", webhookUrl, data);
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // Add this to handle CORS
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        triggered_from: window.location.origin,
        ...data,
      }),
    });

    // Since we're using no-cors, we won't get a proper response status
    return { success: true };
  } catch (error) {
    console.error("Error triggering webhook:", error);
    throw error;
  }
};

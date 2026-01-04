export const getGeminiResponse = async (
  message: string,
  history: any[]
): Promise<string> => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const res = await fetch(`${apiUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  const data = await res.json();
  return data.reply;
};

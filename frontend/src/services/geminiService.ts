export const getGeminiResponse = async (
  message: string,
  history: any[]
): Promise<string> => {
  const res = await fetch("http://localhost:5000/api/chat", {
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

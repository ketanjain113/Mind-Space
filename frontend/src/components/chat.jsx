import { useState } from "react";

function Chat() {
  const [userMessage, setUserMessage] = useState("");
  const [botReply, setBotReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();
      setBotReply(data.reply);
      setUserMessage("");
    } catch (error) {
      console.error(error);
      setBotReply("Frontend error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* YOUR UI — untouched */}
    </>
  );
}

export default Chat;

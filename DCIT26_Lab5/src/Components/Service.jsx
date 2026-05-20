import { useState } from "react";

const WELCOME_MSG =
  "Welcome to Takipsilim Café support. How can we help you?";

export const Service = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: "crew", text: WELCOME_MSG },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text },
    ]);
    setInput("");

    // Simple auto-reply (replace with API/socket later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "crew",
          text: "Thanks for your message! Our crew will get back to you shortly.",
        },
      ]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-5 bg-[#efe4d4] rounded-xl border border-[#605146]/20 shadow-md text-[#2f241c]">
      <h2 className="text-2xl md:text-3xl font-black text-center mb-5">
        Chat with Our Crew
      </h2>

      <div className="max-w-2xl mx-auto rounded-[26px] border-2 border-[#605146]/60 bg-[#d4d4d4] p-4 md:p-5 flex flex-col min-h-[420px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 max-h-[320px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl border border-black/40 px-4 py-3 text-sm ${
                  msg.from === "user"
                    ? "bg-[#2f241c] text-white"
                    : "bg-white text-[#605146]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input row */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message ....."
            className="flex-1 rounded-xl border border-black/40 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#605146]/20"
          />
          <button
            type="button"
            onClick={handleSend}
            className="px-5 py-2.5 rounded-xl bg-[#2f241c] text-white text-sm font-bold hover:opacity-90 transition shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
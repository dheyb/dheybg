import { useState } from "react";
import { useCart } from "../Context/useCart";

const progressLabels = [
  "Order Confirmed",
  "Preparing",
  "Out For Delivery",
  "Delivered",
];

const RIDER_WELCOME =
  "Hi! I'm your rider for this order. Message me if you need help with delivery.";

export const Delivery = () => {
  const { orders = [] } = useCart();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const openTrack = (order) => {
    setSelectedOrder(order);
    setShowTrackModal(true);
    setShowChatModal(false);
  };

  const openChat = (order) => {
    setSelectedOrder(order);
    setShowTrackModal(false);
    setShowChatModal(true);
    setMessage("");
    setChatMessages([
      { id: 1, from: "rider", text: RIDER_WELCOME },
    ]);
  };

  const closeModals = () => {
    setShowTrackModal(false);
    setShowChatModal(false);
    setSelectedOrder(null);
    setMessage("");
    setChatMessages([]);
  };

  const handleSend = () => {
    const text = message.trim();
    if (!text || !selectedOrder) return;

    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text },
    ]);
    setMessage("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "rider",
          text: "Got it! I'll update you soon.",
        },
      ]);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-5 bg-[#f0e3d2] rounded-xl border border-[#605146]/10 shadow-md text-[#605146]">
      <h3 className="text-3xl font-semibold text-center mb-6">Your Deliveries</h3>

      {orders.length === 0 ? (
        <div className="bg-white/70 border border-[#605146]/30 rounded-2xl p-6 text-center">
          <p className="font-semibold">No active deliveries yet.</p>
          <p className="text-sm opacity-70 mt-1">
            Place an order from Menu then Check &amp; Pay.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white/70 border border-[#605146]/30 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="font-bold text-lg">{order.id}</p>
                  <p className="text-sm opacity-80">Items: {order.items}</p>
                  <p className="text-sm opacity-80">Total: ₱{order.total}</p>
                  <p className="text-sm opacity-80">{order.createdAt}</p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-blue-700 text-white">
                    {order.status}
                  </span>
                  <p className="mt-2 font-bold">{order.eta}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => openTrack(order)}
                  className="flex-1 py-2 rounded-md bg-[#605146] text-white hover:opacity-90 transition"
                >
                  Track Order
                </button>
                <button
                  type="button"
                  onClick={() => openChat(order)}
                  className="flex-1 py-2 rounded-md bg-black text-white hover:opacity-90 transition"
                >
                  Chat Rider
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showTrackModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="w-full max-w-xl bg-white rounded-md border border-[#605146]/40 p-4">
            <h4 className="text-2xl font-semibold mb-4">Track Your Order</h4>

            <div className="w-full h-8 rounded-full border border-[#605146]/40 overflow-hidden mb-4">
              <div
                className="h-full bg-[#7a522e] transition-all"
                style={{
                  width: `${(((selectedOrder.progressStep ?? 0) + 1) / progressLabels.length) * 100}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-4 text-xs md:text-sm text-center mb-4">
              {progressLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className="rounded-md bg-gray-500 text-white text-center py-2 mb-3">
              Your order is {progressLabels[selectedOrder.progressStep ?? 0]}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowTrackModal(false);
                setShowChatModal(true);
                setChatMessages([{ id: 1, from: "rider", text: RIDER_WELCOME }]);
              }}
              className="w-full py-2 rounded-md bg-black text-white"
            >
              Chat with Rider
            </button>

            <button
              type="button"
              onClick={closeModals}
              className="w-full mt-2 py-2 rounded-md border border-[#605146]/40"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showChatModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="w-full max-w-xl bg-white rounded-xl border border-[#605146]/40 p-4 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xl font-bold">Chat with Rider</h4>
              <p className="text-xs opacity-60 truncate max-w-[140px]">
                {selectedOrder.id}
              </p>
            </div>

            {/* Chat history */}
            <div className="flex-1 min-h-[200px] max-h-[280px] overflow-y-auto border border-[#605146]/20 rounded-lg bg-[#f5f5f5] p-3 mb-3 space-y-2">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.from === "user"
                        ? "bg-[#2f241c] text-white"
                        : "bg-white border border-[#605146]/25 text-[#605146]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message your rider"
                className="flex-1 border border-[#605146]/30 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#605146]/15"
              />
              <button
                type="button"
                onClick={handleSend}
                className="px-5 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:opacity-90"
              >
                Send
              </button>
            </div>

            <button
              type="button"
              onClick={closeModals}
              className="w-full mt-3 py-2 rounded-lg border border-[#605146]/40 text-sm font-semibold hover:bg-[#f0e3d2]/50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
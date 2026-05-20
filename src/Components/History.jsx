import { useMemo, useState } from "react";
import { useCart } from "../Context/useCart";

export const History = () => {
  const { orders = [] } = useCart();

  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const orderCount = useMemo(() => orders.length, [orders]);

  const openRateModal = (order) => {
    setSelectedOrder(order);
    setRating(0);
    setComment("");
    setShowRateModal(true);
  };

  const closeRateModal = () => {
    setShowRateModal(false);
    setSelectedOrder(null);
    setRating(0);
    setComment("");
  };

  const submitRating = () => {
    if (!selectedOrder) return;
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    console.log("Rating submitted:", {
      orderId: selectedOrder.id,
      rating,
      comment,
    });

    alert("Thank you for your rating!");
    closeRateModal();
  };

  return (
    <div className="p-5 bg-[#efe4d4] rounded-xl border border-[#605146]/20 shadow-md text-[#3f3126]">
      <div className="relative mb-5 min-h-[52px]">
        <h2 className="absolute left-1/2 -translate-x-1/2 text-3xl md:text-5xl font-semibold italic text-center whitespace-nowrap">
          Order History
        </h2>

        <div className="ml-auto w-fit bg-[#9a9a9a] text-black border border-[#605146]/40 rounded-sm px-3 py-2 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wide">Counts of Orders</p>
          <p className="text-lg font-black leading-5">{orderCount}x</p>
        </div>
      </div>

      <div className="rounded-[26px] border-2 border-[#605146]/50 p-4 bg-[#e9dccb]">
        <div className="max-h-[330px] overflow-y-auto pr-2 space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white/70 border border-[#605146]/30 rounded-xl p-5 text-center">
              <p className="font-semibold">No order history yet.</p>
              <p className="text-sm opacity-70 mt-1">Placed orders will appear here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#efefef] border border-[#605146]/40 rounded-xl overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-lg">{order.id}</p>
                      <p className="text-sm opacity-75">Items: {order.items}</p>
                      <p className="text-sm opacity-75">Total: ₱{order.total}</p>
                      <p className="text-sm opacity-75">{order.createdAt}</p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white border border-emerald-700">
                      {(order.status || "COMPLETED").toUpperCase()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-2 bg-[#f39b57] hover:bg-[#e8883e] text-[#2f241c] font-semibold text-sm border-t border-[#605146]/40 transition"
                  onClick={() => openRateModal(order)}
                >
                  Rate Order
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {showRateModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-[#f5f5f5] border-2 border-[#2f241c] rounded-2xl p-4 relative">
            <button
              onClick={closeRateModal}
              className="absolute top-2 right-3 text-xl font-bold text-black"
            >
              ×
            </button>

            <h3 className="text-xl font-black mb-4">Rate Your Order</h3>

            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-4xl leading-none ${
                    star <= rating ? "text-yellow-500" : "text-black/70"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment (optional)"
              className="w-full border border-black/40 bg-white px-3 py-2 text-sm mb-4 outline-none"
            />

            <button
              type="button"
              onClick={submitRating}
              className="w-full py-2 bg-black text-white rounded-md text-sm font-semibold hover:opacity-90 transition"
            >
              Submit Rating
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
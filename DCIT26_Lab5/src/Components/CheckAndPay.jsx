import { useState } from "react";
import { useCart } from "../Context/useCart";

export const CheckAndPay = () => {
  const { cartItems, cartTotal, placeOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "online" | "cod"

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = placeOrder();
    if (order) {
      alert(
        `Order placed!\nPayment: ${
          paymentMethod === "online" ? "Online (e-wallet)" : "Cash on Delivery"
        }`
      );
    }
  };

  return (
    <div className="p-5 bg-[#efe4d4] rounded-xl border border-[#605146]/20 shadow-md text-[#2f241c]">
      <div className="rounded-[26px] border-2 border-[#605146]/60 bg-[#e9dccb] p-5 md:p-6 max-w-2xl mx-auto space-y-4">
        {/* Order Summary */}
        <div className="bg-white border border-black/50 rounded-xl p-4">
          <h3 className="text-lg font-black mb-3">Order Summary</h3>

          {cartItems.length === 0 ? (
            <p className="text-sm opacity-70">Your cart is empty.</p>
          ) : (
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm font-semibold"
                >
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>₱{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total */}
        <div className="bg-white border border-black/50 rounded-xl px-4 py-3 flex justify-between items-center font-black">
          <span>Total:</span>
          <span>₱{cartTotal}</span>
        </div>

        {/* Payment Method */}
        <div className="bg-white border border-black/50 rounded-xl p-4">
          <h3 className="text-lg font-black mb-3">Payment Method</h3>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("online")}
              className={`w-full text-left border border-black/40 rounded-xl p-4 transition ${
                paymentMethod === "online"
                  ? "bg-[#f5d76e] border-black/60"
                  : "bg-white hover:bg-[#f5f0e8]"
              }`}
            >
              <p className="font-black text-sm">💳 Online Payment</p>
              <p className="text-xs opacity-75 mt-1">Pay using e-wallet</p>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cod")}
              className={`w-full text-left border border-black/40 rounded-xl p-4 transition ${
                paymentMethod === "cod"
                  ? "bg-[#f5d76e] border-black/60"
                  : "bg-white hover:bg-[#f5f0e8]"
              }`}
            >
              <p className="font-black text-sm">💵 Cash on Delivery</p>
              <p className="text-xs opacity-75 mt-1">Pay when your order arrives</p>
            </button>
          </div>
        </div>

        {/* Place Order */}
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          className="w-full py-3 rounded-xl bg-[#2f241c] text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
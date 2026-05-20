import { useState } from "react"
import { ProductsData } from "../assets/Utils/ProductList.jsx"
import { useCart } from "../Context/useCart";

export const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const menuCategory = [
        "Coffee Based", 
        "Non - Coffee Based", 
        "Frapped Based", 
        "Rice Meals", 
        "Chicken Wings"
    ];

    const handleOpenQuantityModal = (item) => {
        setSelectedItem(item);
        setQuantity(1);
        setShowModal(true);
    };

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const { addToCart } = useCart();

const handleConfirmAddToCart = () => {
  addToCart(selectedItem, quantity);
  setShowModal(false);
};

const STORAGE_KEY = "takipsilim_saved_sips";

const saveSipToLocal = (item) => {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!list.some((x) => x.id === item.id)) {
      list.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      alert(`${item.name} saved to Saved Sips!`);
    } else {
      alert("Already in Saved Sips.");
    }
  } catch {
    alert("Could not save sip.");
  }
};

    return (
        <div className="menu-container max-w-4xl mx-auto px-4 py-6 relative">
            
            {showModal && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl border border-gray-100 relative animate-scale-up">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-sm"
                        >
                            ✕
                        </button>
                        
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden mx-auto mb-3 border border-gray-200">
                            <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <h3 className="text-base font-black text-[#605146] uppercase tracking-wide capitalize">{selectedItem.name}</h3>
                        <p className="text-sm font-bold text-[#624d2d] mt-0.5">₱{selectedItem.price}</p>
                        
                        <div className="flex items-center justify-center gap-4 my-5">
                            <button 
                                type="button"
                                onClick={handleDecrement}
                                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-[#605146] font-black text-lg rounded-full transition-all active:scale-90"
                            >
                                -
                            </button>
                            <span className="text-xl font-black text-gray-800 w-8">{quantity}</span>
                            <button 
                                type="button"
                                onClick={handleIncrement}
                                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-[#605146] font-black text-lg rounded-full transition-all active:scale-90"
                            >
                                +
                            </button>
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500 px-1">
                                <span>Total Price:</span>
                                <span className="text-sm text-[#624d2d] font-black">₱{selectedItem.price * quantity}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleConfirmAddToCart}
                                className="w-full py-2.5 bg-[#00bf63] hover:bg-[#009e52] text-white text-sm font-bold rounded-xl shadow-sm transition-colors active:scale-[0.97]"
                            >
                                Confirm Order ☕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!selectedMenu && (
                <div className="animate-fade-in max-w-2xl mx-auto">
                    <div className="p-2 text-center sm:text-left">
                        <h2 className="text-xl font-bold uppercase tracking-wider text-[#605146]">📋 MENU CATEGORIES</h2>
                        <p className="text-xs text-gray-500 mt-1">Select a category to view our delicious offerings</p>
                    </div>

                    <hr className="my-3 border-gray-300" />

                    <div className="flex flex-col gap-3 w-full px-1">
                        {menuCategory.map((menu, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedMenu(menu)}
                                className="w-full px-5 py-4 bg-white text-black hover:bg-[#4a3a22] hover:text-white font-semibold text-base rounded-xl transition-all shadow-md border border-black/10 flex justify-between items-center active:scale-[0.99]"
                            >
                                <span>{menu}</span>
                                <span className="text-xs opacity-60">View Items ➔</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedMenu && (
                <div className="animate-fade-in">
                    <div className="p-2 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold uppercase tracking-wider text-[#605146]">
                                {selectedMenu}
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">Freshly prepared for you</p>
                        </div>
                        
                        <button
                            type="button"
                            onClick={() => setSelectedMenu(null)}
                            className="px-4 py-2 bg-gray-200 text-[#605146] hover:bg-gray-300 font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
                        >
                            ⬅️ Back
                        </button>
                    </div>

                    <hr className="my-3 border-gray-300" />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {ProductsData[selectedMenu] && ProductsData[selectedMenu].map((item) => (
                            <div 
                                key={item.id} 
                                className="bg-[#8f703a] rounded-2xl shadow-sm border border-[#605146]/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                            >
                                <div className="w-full h-36 sm:h-44 bg-[#f0e3d2]/30 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                
                                <div className="p-3 flex-grow flex flex-col justify-between gap-2 bg-[#f0e3d2]/20">
                                    <div>
                                        <h4 className="font-bold text-sm sm:text-base text-white line-clamp-2 capitalize h-10 sm:h-12 flex items-center justify-center">
                                            {item.name}
                                        </h4>
                                    </div>
                                    
                                    <div className="flex items-center justify-center mt-1">
                                        <span className="font-black text-base sm:text-lg text-white">
                                            ₱{item.price}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenQuantityModal(item)}
                                            className="flex-1 py-2 bg-[#00bf63] hover:bg-[#4a3a22] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-colors active:scale-[0.97] flex items-center justify-center gap-1"
                                        >
                                            Add to Cart ☕
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => saveSipToLocal(item)}
                                            className="px-3 py-2 bg-[#2f241c] text-white rounded-xl text-sm shadow-sm active:scale-[0.97]"
                                            title="Save sip"
                                        >
                                            ♥
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
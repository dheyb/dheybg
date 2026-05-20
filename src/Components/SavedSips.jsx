import { useEffect, useState } from "react";
import { useCart } from "../Context/useCart";

const loadSavedFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
};

const cleanDemoItems = (list) => {
  if (!Array.isArray(list)) return [];
  return list.filter((x) => !DEMO_IDS.includes(x.id));
};

export const SavedSips = () => {
  const { addToCart } = useCart();
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const init = () => {
      const fromStorage = loadSavedFromStorage();
      if (fromStorage && Array.isArray(fromStorage)) {
        const cleaned = cleanDemoItems(fromStorage);
        setSaved(cleaned);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      } else {
        setSaved([]);
      }
    };

    init();

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        const list = loadSavedFromStorage();
        if (list && Array.isArray(list)) {
          setSaved(cleanDemoItems(list));
        }
      }
    };

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        const list = loadSavedFromStorage();
        if (list && Array.isArray(list)) setSaved(cleanDemoItems(list));
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("storage", onStorage);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const persist = (items) => {
    setSaved(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const removeSaved = (id) => {
    persist(saved.filter((x) => x.id !== id));
  };

  const handleAddToCart = (item) => {
    addToCart(
      { id: item.id, name: item.name, price: item.price, image: item.image },
      1
    );
  };

  return (
    <div className="p-5 bg-[#f5f0e8] rounded-xl border border-[#605146]/20 shadow-md">
      <h2 className="text-4xl font-serif font-bold text-center text-black mb-6">
        Saved Sips
      </h2>

      <div className="rounded-3xl border-2 border-black/80 bg-[#e9dcc9] p-6">
        {saved.length === 0 ? (
          <p className="text-center text-[#605146] py-8">
            No saved sips yet. Save drinks from the Menu with ♥.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {saved.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-black/50 rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-[#f0e3d2]/40">
                  <img
                    src={item.image || PLACEHOLDER_IMAGE}
                    alt={item.name}
                    className="h-full w-full min-h-full min-w-full object-cover object-center scale-[1.06]"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
                <div className="p-3 flex flex-col flex-1 gap-2">
                  <p className="font-black text-sm text-center uppercase tracking-wide text-[#2f241c]">
                    {item.name}
                  </p>
                  <p className="text-center font-bold text-[#624d2d]">₱{item.price}</p>
                  <div className="flex gap-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 py-2 bg-[#2f241c] text-white text-xs font-bold rounded-lg hover:opacity-90"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSaved(item.id)}
                      className="w-10 shrink-0 bg-[#2f241c] text-white rounded-lg flex items-center justify-center text-lg"
                      title="Remove from saved"
                    >
                      ☕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
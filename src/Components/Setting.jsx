import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "takipsilim_customer_profile";

const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  photo: null,
};

export const Setting = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile({ ...defaultProfile, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePickPhoto = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-3xl mx-auto rounded-[28px] border-2 border-[#605146]/50 bg-[#e9dcc9] shadow-md overflow-hidden">
        {/* Header row */}
        <div className="px-5 md:px-8 pt-6 pb-4 border-b border-[#605146]/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#2f241c]">
              Customer Profile
            </h2>
            <p className="text-xs text-[#605146]/80 mt-1">
              Update your details for faster checkout and delivery.
            </p>
          </div>

          <div className="flex items-center gap-4 sm:flex-col sm:items-end">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl border-2 border-[#605146]/40 bg-white overflow-hidden shrink-0 shadow-sm">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl opacity-30">
                  👤
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              onClick={handlePickPhoto}
              className="text-sm font-bold text-[#2f241c] underline underline-offset-2 hover:opacity-70"
            >
              Set Profile
            </button>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-5 md:p-8">
          <div className="bg-white/90 border border-[#605146]/25 rounded-2xl p-5 md:p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-black text-[#2f241c] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#605146]/30 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#605146] focus:ring-2 focus:ring-[#605146]/15"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-[#2f241c] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#605146]/30 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#605146] focus:ring-2 focus:ring-[#605146]/15"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-[#2f241c] mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#605146]/30 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#605146] focus:ring-2 focus:ring-[#605146]/15"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-black text-[#2f241c] mb-1.5">
                  Delivery Address
                </label>
                <textarea
                  rows={3}
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter your delivery address"
                  className="w-full rounded-xl border border-[#605146]/30 bg-white px-4 py-2.5 text-sm outline-none resize-none focus:border-[#605146] focus:ring-2 focus:ring-[#605146]/15"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-[#605146]/70">
              Your profile is saved on this device only.
            </p>
            <button
              type="button"
              onClick={handleSave}
              className="px-10 py-2.5 rounded-xl bg-[#2f241c] text-white text-sm font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition sm:ml-auto"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
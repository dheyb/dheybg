import { useState } from "react";
import { useAuth } from "../Context/useAuth";
import logo from "../assets/Images/logo.png";

export const Navbar = ({ activeLink, setActiveLink }) => {
  const { handleLogout } = useAuth();
  const navlink = [
    "Home",
    "Delivery",
    "Saved Sips",
    "History",
    "Check & Pay",
    "Setting",
    "Service",
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#f0e3d2] mx-3 rounded-lg p-4 relative z-50">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex flex-row items-center">
            <img src={logo} className="rounded-full w-12 h-12 object-cover" alt="logo" />
            <h5 className="font-bold ml-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
              TAKIPSILIM CAFE
            </h5>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#605146] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:block">
            <ul className="flex flex-row gap-4 text-white font-medium">
              {navlink.map((item, i) => (
                <li
                  key={i}
                  onClick={() => setActiveLink(item)}
                  className={`cursor-pointer px-4 py-2 rounded-lg whitespace-nowrap transition duration-200 ${
                    activeLink === item
                      ? "bg-[#afa89e] text-amber-100 font-bold shadow-md"
                      : "bg-[#605146] hover:text-amber-200"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#605146] text-white rounded-lg hover:bg-red-400 transition duration-200 whitespace-nowrap font-medium"
          >
            Sign Out
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#605146]/20">
            <ul className="flex flex-col gap-3 text-white font-medium">
              {navlink.map((item, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setActiveLink(item);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-3 rounded-lg text-center transition duration-200 ${
                    activeLink === item
                      ? "bg-[#8f703a] text-amber-100 font-bold"
                      : "bg-[#605146] hover:text-amber-200"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};
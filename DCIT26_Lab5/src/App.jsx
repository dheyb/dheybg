import { useState } from "react";
import { useAuth } from "./Context/useAuth";
import { CartProvider } from "./Context/useCart";
import { Navbar } from "./Components/Navbar";
import { Content } from "./Components/Content";
import { Footer } from "./Components/Footer";
import { SignIn } from "./Components/SignIn";
import "./App.css";

function App() {
  const { user } = useAuth();
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {!user ? (
          <>
            <main className="flex-1">
              <SignIn />
            </main>
            <Footer />
          </>
        ) : (
          <>
            <Navbar activeLink={activeLink} setActiveLink={setActiveLink} />
            <main className="flex-1">
              <Content activeLink={activeLink} />
            </main>
            <Footer />
          </>
        )}
      </div>
    </CartProvider>
  );
}

export default App;
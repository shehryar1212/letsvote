
import { useState, useEffect } from "react";
import WalletConnect from "./WalletConnect";
import { Vote } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 ${
        scrolled 
          ? "py-3 glassmorphism shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Vote className="h-6 w-6 mr-2" />
          <span className="text-xl font-medium">Leader Votes</span>
        </div>
        
        <WalletConnect />
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PortfolioDropdown from "@/components/PortfolioDropdown";
import PortfolioManager from "@/components/PortfolioManager";

const Navbar = ({ name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    {id:1, label: "Home", href: "#intro" },
    {id:2, label: "About Me", href: "#about" },
    {id:3, label: "Skills", href: "#skills" },
    {id:4, label: "Projects", href: "#projects" },
    {id:5, label: "Experience", href: "#experience" },
    {id:6, label: "Contact Me", href: "#contact" },
  ];

  return (
    <nav className="bg-transparent sticky top-0 backdrop-blur-[1.5px] z-9999 w-full text-gray-200 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <div className="text-xl sm:text-2xl font-sans font-bold">{name}</div>

          {/* Desktop Menu */}
          <div className="hidden sm:block">
            <div className="flex gap-6 lg:gap-8 items-center">
              {navItems.map((item) => (
                <a key={item.id} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <div className="relative focus:font-bold group cursor-pointer px-1 font-sans py-2 text-base lg:text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white hover:scale-105 hover:shadow-blue-500/50 hover:-translate-y-1 lg:hover:-translate-y-2">
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
                  </div>
                </a>
              ))}

              {/* Auth Buttons */}
              <div className="flex gap-4 ml-4">
                {user ? (
                  <>
                    <PortfolioDropdown onClose={() => setIsPortfolioModalOpen(false)} />
                    {/* Admin Dashboard removed - login/logout controls remain */}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push("/signin")}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                ></span>
              </div>
            </button>
            {/* Compact auth buttons visible beside hamburger on small screens */}
            <div className="ml-2 flex items-center gap-2">
              {user ? (
                <>
                  <button
                    onClick={() => { setIsPortfolioModalOpen(true); setIsMenuOpen(false); }}
                    className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { router.push("/signin"); setIsMenuOpen(false); }}
                  className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <ul className="py-4 space-y-2 border-t border-gray-700/50 mt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <li className="relative group cursor-pointer px-3 py-3 font-sans text-lg text-gray-200 font-medium transition-all duration-300 hover:text-white hover:bg-gray-800/50 rounded-lg">
                  {item.label}
                  <span className="absolute left-3 right-3 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
                </li>
              </a>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-gray-700/50 mt-2">
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <button
                    onClick={() => { setIsPortfolioModalOpen(true); setIsMenuOpen(false); }}
                    className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { router.push("/signin"); setIsMenuOpen(false); }}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Manager Modal */}
      {isPortfolioModalOpen && (
        <PortfolioManager onClose={() => setIsPortfolioModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;

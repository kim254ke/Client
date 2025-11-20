import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('glamhub-darkMode');
    if (savedMode !== null) return JSON.parse(savedMode);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('glamhub-darkMode', JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const links = [
    { to: "/", label: "Home" },
    { to: "/stylists", label: "Stylists" },
    { to: "/booking", label: "Book Now" },
    { to: "/services", label: "Services" },
  ];

  const activeClass = "text-pink-500 dark:text-pink-400 font-semibold border-b-2 border-pink-500 dark:border-pink-400";
  const inactiveClass = "text-gray-800 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 transition font-medium border-b-2 border-transparent hover:border-pink-500/50";
  const mobileInactiveClass = "text-gray-900 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 transition block py-2";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md border-b border-white/40 dark:border-gray-700/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src="./logo/glamhub.png" alt="" className="w-10 h-10 rounded-full object-cover shadow-lg" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-wide">GlamHub</h1>
        </Link>

        {/* Desktop Menu + Utilities */}
        <div className="hidden md:flex items-center gap-8">
          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `pb-1 ${isActive ? activeClass : inactiveClass}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* User/Auth Area */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow transition-colors duration-300 hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-gray-900" />}
            </button>

            {!user ? (
  <>
    <Link to="/login" className="nav-button-secondary">Login</Link>
    <Link to="/register" className="nav-button-primary">Register</Link>
  </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 hidden lg:inline">{user.name?.split(" ")[0]}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700">Profile</Link>
                    <Link to="/booking" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700">My Bookings</Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={() => { logoutUser(); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <XMarkIcon className="w-7 h-7 text-gray-900 dark:text-white" /> : <Bars3Icon className="w-7 h-7 text-gray-900 dark:text-white" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-white/30 dark:border-gray-600 transition-colors duration-300">
          <div className="flex flex-col px-6 py-4 gap-2 text-lg">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={toggleMenu}
                className={({ isActive }) => `${mobileInactiveClass} ${isActive ? 'font-bold text-pink-500 dark:text-pink-400' : 'font-medium'}`}
              >
                {l.label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
              {!user ? (
                <div className="flex justify-between items-center gap-4">
                <Link
  to="/login"
  className="w-full py-2 text-base font-medium rounded-lg text-gray-800 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 transition"
>Login</Link>
<Link
  to="/register"
  className="w-full py-2 text-base font-medium rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
>Register</Link>
              </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/profile" onClick={toggleMenu} className={`${mobileInactiveClass}`}>Profile</Link>
                  <Link to="/booking" onClick={toggleMenu} className={`${mobileInactiveClass}`}>My Bookings</Link>
                  <button
                    onClick={() => { logoutUser(); toggleMenu(); }}
                    className="w-full text-left py-2 text-red-600 dark:text-red-400 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggleDarkMode}
              className="mt-3 p-3 rounded-xl bg-gray-200 dark:bg-gray-700 shadow flex items-center justify-center gap-3 transition-colors duration-300"
            >
              {darkMode ? (
                <>
                  <SunIcon className="w-6 h-6 text-yellow-300" />
                  <span className="text-gray-900 dark:text-white">Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <MoonIcon className="w-6 h-6 text-gray-900" />
                  <span className="text-gray-900 dark:text-white">Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

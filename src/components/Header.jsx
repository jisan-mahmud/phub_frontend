import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiSearch } from 'react-icons/fi';

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const isLoggedIn = false; // This would come from your auth context

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            CodeShare
          </Link>

          <div className={`flex-1 max-w-xl mx-4 transition-all duration-200 ${
            isSearchFocused ? 'md:max-w-2xl' : ''
          }`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search snippets..."
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                         text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Home
                  </Link>
                  <Link to="/explore" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Explore
                  </Link>
                  <Link to="/new" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    New Snippet
                  </Link>
                  <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {isDark ? 
                <FiSun className="h-5 w-5 text-yellow-400" /> : 
                <FiMoon className="h-5 w-5 text-gray-600" />
              }
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
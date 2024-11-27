import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

function AuthHeader() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            CodeShare
          </Link>
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
    </header>
  );
}

export default AuthHeader;
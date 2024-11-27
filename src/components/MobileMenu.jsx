import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCompass, FiPlusSquare, FiUser } from 'react-icons/fi';

function MobileMenu() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: FiHome, name: 'Home', path: '/' },
    { icon: FiCompass, name: 'Explore', path: '/explore' },
    { icon: FiPlusSquare, name: 'New', path: '/new' },
    { icon: FiUser, name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-around h-16">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full
              ${isActive(item.path) 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
          >
            <item.icon className={`h-6 w-6 ${isActive(item.path) ? 'scale-110' : ''}`} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default MobileMenu;
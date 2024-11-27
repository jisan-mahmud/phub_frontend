import { Link } from 'react-router-dom';

function AuthFooter() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { name: 'About', href: '/about' },
    { name: 'Help', href: '/help' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {currentYear} CodeShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default AuthFooter;
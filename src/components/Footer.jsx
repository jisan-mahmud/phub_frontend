import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { name: 'About', href: '/about' },
    { name: 'Help', href: '/help' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ];

  const socials = [
    { icon: FiGithub, name: 'GitHub', href: 'https://github.com' },
    { icon: FiTwitter, name: 'Twitter', href: 'https://twitter.com' },
    { icon: FiLinkedin, name: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <footer className="hidden md:block bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          
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

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Log in
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link to="/signup" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Sign up
            </Link>
          </div>

          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {currentYear} CodeShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
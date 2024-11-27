import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import MobileMenu from './MobileMenu';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 mb-16 md:mb-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="hidden md:block">
            <LeftSidebar />
          </div>
          <div className="md:col-span-2">
            <Outlet />
          </div>
          <div className="hidden md:block">
            <RightSidebar />
          </div>
        </div>
      </div>
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default Layout;
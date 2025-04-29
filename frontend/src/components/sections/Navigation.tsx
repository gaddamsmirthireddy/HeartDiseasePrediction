import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';
import { useUserRole } from '../../hooks/useAuth';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, user } = useAuth();
  const { data: userRoleData } = useUserRole();
  
  // Determine user role - either from query or direct calculation
  const userRole = userRoleData?.role || (user?.userType || '');
  const isDoctor = userRole === 'doctor';
  const isAdmin = userRole === 'admin';
  
  // Navigation items based on user role and authentication status
  const getNavItems = () => {
    const baseItems = [
      { name: 'Home', href: '/' },
      { name: 'How It Works', href: '/how-it-works' },
    ];
    
    if (!isLoggedIn) {
      return [
        ...baseItems,
        { name: 'Features', href: '/features' },
        { name: 'Contact', href: '/contact' },
      ];
    }
    
    if (isDoctor) {
      return [
        ...baseItems,
        { name: 'Manage Appointments', href: '/appointments/manage' },
        { name: 'Dashboard', href: '/doctor/dashboard' },
        { name: 'Contact', href: '/contact' },
      ];
    }
    
    if (isAdmin) {
      return [
        ...baseItems,
        { name: 'Admin Dashboard', href: '/admin/dashboard' },
        { name: 'Manage Appointments', href: '/appointments/manage' },
      ];
    }
    
    // Regular patient user
    return [
      ...baseItems,
      { name: 'Features', href: '/features' },
      { name: 'Heart Predictor', href: '/predictor' },
      { name: 'Appointments', href: '/appointments' },
      { name: 'Hospitals', href: '/hospitals' },
      { name: 'Dashboard', href: '/patient/dashboard' },
      { name: 'Contact', href: '/contact' },
    ];
  };
  
  const navItems = getNavItems();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="Heart Health" 
                className="h-8 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/32?text=H';
                }}
              />
              <span className="ml-2 text-xl font-bold text-primary">HeartHealth</span>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hello, {user?.name || 'User'}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 text-base font-medium ${
                location.pathname === item.href
                  ? 'text-primary bg-gray-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
            >
              Logout
            </button>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 
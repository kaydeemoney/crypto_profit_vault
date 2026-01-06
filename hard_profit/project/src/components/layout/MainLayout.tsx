// Main Layout Component
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  ListChecks, 
  User,
  Users,
  ArrowRightLeft,
  History,
  LogOut,
  Menu,
  X,
  DollarSign,
  Home
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/investment-plans', name: 'Investment Plans', icon: <ListChecks size={20} /> },
    { path: '/deposit', name: 'Deposit', icon: <DollarSign size={20} /> },
    { path: '/withdraw', name: 'Withdraw', icon: <ArrowRightLeft size={20} /> },
    { path: '/referral', name: 'Referral Program', icon: <Users size={20} /> },
    { path: '/transactions', name: 'Transaction History', icon: <History size={20} /> },
    { path: '/profile', name: 'My Profile', icon: <User size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-blue-900">
          <div className="flex items-center justify-center h-16 px-4 bg-blue-950">
            <Link to="/dashboard" className="flex items-center">
              <Home className="h-8 w-8 text-amber-400" />
              <span className="ml-2 text-xl font-bold text-white">Profit Vault</span>
            </Link>
          </div>
          <div className="flex flex-col flex-grow px-2 py-4 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      group flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-800 text-white' 
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'}
                    `}
                  >
                    <div className={isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}>
                      {item.icon}
                    </div>
                    <span className="ml-3">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="group flex items-center w-full px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-colors duration-200"
              >
                <LogOut size={20} className="text-blue-300 group-hover:text-white" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow md:px-6">
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="ml-2 md:ml-0 text-lg md:text-xl font-semibold">
              {navigationItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center">
            {currentUser && (
              <div className="flex items-center">
                <div className="hidden md:block">
                  <span className="text-sm font-medium">
                    {currentUser.firstName} {currentUser.lastName}
                  </span>
                </div>
                <Link to="/profile" className="ml-3 relative">
                  <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center text-white">
                    {!currentUser.profileImage && (
                      <span>{currentUser.firstName[0]}{currentUser.lastName[0]}</span>
                    )}
                    {currentUser.profileImage && (
                      <img 
                        src={currentUser.profileImage} 
                        alt="Profile" 
                        className="h-full w-full object-cover rounded-full"
                      />
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </header>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-blue-900">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={toggleMobileMenu}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4">
                <Home className="h-8 w-8 text-amber-400" />
                <span className="ml-2 text-xl font-bold text-white">Profit Vault</span>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`
                          group flex items-center px-4 py-3 rounded-lg
                          ${isActive 
                            ? 'bg-blue-800 text-white' 
                            : 'text-blue-100 hover:bg-blue-800 hover:text-white'}
                        `}
                        onClick={toggleMobileMenu}
                      >
                        <div className={isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}>
                          {item.icon}
                        </div>
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => {
                      toggleMobileMenu();
                      handleLogout();
                    }}
                    className="group flex items-center w-full px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white"
                  >
                    <LogOut size={20} className="text-blue-300 group-hover:text-white" />
                    <span className="ml-3">Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
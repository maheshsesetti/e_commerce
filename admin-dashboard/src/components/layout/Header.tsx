import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Search */}
          <div className="relative ml-4 hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
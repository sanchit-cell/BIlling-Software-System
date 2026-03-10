import React from 'react';
import { useDispatch } from 'react-redux';
import { collapsedSidebar, toggleSidebar } from '../provider/slice/Sidebar.slice';
import { removeUser } from '../provider/slice/user.slice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { FiSun, FiMoon, FiMonitor, FiBell } from 'react-icons/fi';
import { IconButton } from './ui/Button';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const sidebarHandler = () => dispatch(collapsedSidebar());
  const sidebarHandlerToggle = () => dispatch(toggleSidebar());

  const logoutHandler = () => {
    try {
      localStorage.removeItem('token');
      dispatch(removeUser());
      navigate('/login');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <FiSun className="w-5 h-5" />;
      case 'dark':
        return <FiMoon className="w-5 h-5" />;
      default:
        return <FiMonitor className="w-5 h-5" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="py-3 px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left side - Menu toggle */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={sidebarHandlerToggle}
            >
              <HiOutlineMenuAlt3 className="text-xl text-gray-700 dark:text-gray-300" />
            </button>
            <button
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={sidebarHandler}
            >
              <HiOutlineMenuAlt3 className="text-xl text-gray-700 dark:text-gray-300" />
            </button>
            
            {/* Brand/Title */}
            <h1 className="hidden md:block text-lg font-semibold text-gray-900 dark:text-white">
              Billing Software
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <IconButton
              icon={<FiBell className="w-5 h-5" />}
              tooltip="Notifications"
              className="relative"
            >
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </IconButton>

            {/* Theme toggle */}
            <IconButton
              icon={getThemeIcon()}
              onClick={cycleTheme}
              tooltip={`Theme: ${theme}`}
            />

            {/* Logout */}
            <IconButton
              icon={<IoLogOutOutline className="w-5 h-5" />}
              onClick={logoutHandler}
              tooltip="Logout"
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

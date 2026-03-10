import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarSlicePath, toggleSidebar } from '../provider/slice/Sidebar.slice';
import { UserSlicePath } from '../provider/slice/user.slice';
import { Link, useLocation } from 'react-router-dom';
import {
  MdOutlineSpaceDashboard,
  MdOutlineInventory2,
} from 'react-icons/md';
import { FiUser, FiShoppingBag, FiSettings, FiX } from 'react-icons/fi';
import { IoIosArrowDropleft } from 'react-icons/io';

interface MainLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { path: '/', label: 'Dashboard', icon: MdOutlineSpaceDashboard },
  { path: '/orders', label: 'Orders', icon: FiShoppingBag },
  { path: '/user', label: 'Customers', icon: FiUser },
  { path: '/inventory', label: 'Inventory', icon: MdOutlineInventory2 },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const sidebarState = useSelector(SidebarSlicePath);
  const user = useSelector(UserSlicePath);
  const dispatch = useDispatch();
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarState.collapsed}
        breakPoint="lg"
        toggled={sidebarState.toggle}
        onBackdropClick={() => dispatch(toggleSidebar())}
        backgroundColor="transparent"
        className="border-r border-gray-200 dark:border-gray-800"
        rootStyles={{
          height: '100%',
        }}
      >
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
          {/* Mobile close button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* User Profile Section */}
          {!sidebarState.collapsed && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'user@email.com'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active
                  ? 'rgb(147 51 234 / 0.1)'
                  : 'transparent',
                color: active ? 'rgb(147 51 234)' : 'inherit',
                borderRadius: '0.5rem',
                margin: '0.25rem 0.5rem',
                '&:hover': {
                  backgroundColor: active
                    ? 'rgb(147 51 234 / 0.15)'
                    : 'rgb(0 0 0 / 0.05)',
                },
              }),
            }}
            className="flex-1 py-4"
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                component={<Link to={item.path} />}
                active={isActivePath(item.path)}
                icon={
                  <item.icon
                    className={`w-5 h-5 ${
                      isActivePath(item.path)
                        ? 'text-purple-600'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                }
              >
                <span
                  className={`font-medium ${
                    isActivePath(item.path)
                      ? 'text-purple-600'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </span>
              </MenuItem>
            ))}
          </Menu>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Menu
              menuItemStyles={{
                button: {
                  borderRadius: '0.5rem',
                  '&:hover': {
                    backgroundColor: 'rgb(0 0 0 / 0.05)',
                  },
                },
              }}
            >
              <MenuItem
                icon={
                  <FiSettings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                }
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Settings
                </span>
              </MenuItem>
            </Menu>
            
            {/* Collapse indicator */}
            {!sidebarState.collapsed && (
              <div className="mt-4 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500">
                <IoIosArrowDropleft className="mr-1" />
                Press to collapse
              </div>
            )}
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-auto">
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;

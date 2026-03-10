import React from 'react';
import { FiPackage, FiUsers, FiShoppingCart, FiSearch, FiPlus } from 'react-icons/fi';

type EmptyStateType = 'orders' | 'inventory' | 'users' | 'search' | 'default';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const emptyStateConfig: Record<EmptyStateType, { icon: React.ReactNode; title: string; description: string }> = {
  orders: {
    icon: <FiShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-500" />,
    title: 'No orders yet',
    description: 'Start by creating your first order. All your orders will appear here.',
  },
  inventory: {
    icon: <FiPackage className="w-16 h-16 text-gray-400 dark:text-gray-500" />,
    title: 'Your inventory is empty',
    description: 'Add items to your inventory to start tracking stock and managing products.',
  },
  users: {
    icon: <FiUsers className="w-16 h-16 text-gray-400 dark:text-gray-500" />,
    title: 'No customers found',
    description: 'Your customer list is empty. Add customers to manage their orders and information.',
  },
  search: {
    icon: <FiSearch className="w-16 h-16 text-gray-400 dark:text-gray-500" />,
    title: 'No results found',
    description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
  },
  default: {
    icon: <FiPackage className="w-16 h-16 text-gray-400 dark:text-gray-500" />,
    title: 'Nothing here yet',
    description: 'Get started by adding some data.',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'default',
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const config = emptyStateConfig[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
        {config.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title || config.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {description || config.description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          <FiPlus className="w-5 h-5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

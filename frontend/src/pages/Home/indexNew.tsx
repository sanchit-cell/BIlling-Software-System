import React from 'react';
import {
  FiShoppingCart,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiClock,
  FiArrowRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { StatsCard } from '../../components/ui/StatsCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import BasicChart from './components/Basic';
import BasicChart2 from './components/Basic2';
import PieChartDemo from './components/Pie';

// Quick action cards
const quickActions = [
  {
    title: 'New Order',
    description: 'Create a new customer order',
    icon: FiShoppingCart,
    href: '/orders',
    color: 'bg-blue-500',
  },
  {
    title: 'Add Customer',
    description: 'Register a new customer',
    icon: FiUsers,
    href: '/user',
    color: 'bg-green-500',
  },
  {
    title: 'Add Inventory',
    description: 'Add new items to stock',
    icon: FiPackage,
    href: '/inventory',
    color: 'bg-purple-500',
  },
];

// Recent activity mock data
const recentActivity = [
  { id: 1, type: 'order', message: 'New order #1234 created', time: '2 mins ago', status: 'success' },
  { id: 2, type: 'payment', message: 'Payment received for #1230', time: '15 mins ago', status: 'success' },
  { id: 3, type: 'inventory', message: 'Low stock alert: Widget A', time: '1 hour ago', status: 'warning' },
  { id: 4, type: 'customer', message: 'New customer registered', time: '2 hours ago', status: 'info' },
];

const HomePage: React.FC = () => {
  // In a real app, these would come from API
  const stats = {
    totalRevenue: '₹2,45,000',
    totalOrders: 156,
    totalCustomers: 89,
    lowStockItems: 5,
    revenueChange: 12.5,
    ordersChange: 8.2,
    customersChange: 15.3,
    stockChange: -2,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" dot>
            System Online
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={stats.revenueChange}
          icon={<FiDollarSign className="w-6 h-6 text-green-600" />}
          iconBg="bg-green-100 dark:bg-green-900/30"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          change={stats.ordersChange}
          icon={<FiShoppingCart className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatsCard
          title="Customers"
          value={stats.totalCustomers}
          change={stats.customersChange}
          icon={<FiUsers className="w-6 h-6 text-purple-600" />}
          iconBg="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          change={stats.stockChange}
          icon={<FiPackage className="w-6 h-6 text-orange-600" />}
          iconBg="bg-orange-100 dark:bg-orange-900/30"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
            >
              <div className={`${action.color} p-3 rounded-xl text-white`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
              <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Overview
            </h2>
            <Badge variant="purple">This Month</Badge>
          </div>
          <BasicChart />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Orders Trend
            </h2>
            <Badge variant="info">Last 7 Days</Badge>
          </div>
          <BasicChart2 />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" rightIcon={<FiArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div
                  className={`mt-1 p-2 rounded-full ${
                    activity.status === 'success'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : activity.status === 'warning'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30'
                      : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}
                >
                  {activity.type === 'order' ? (
                    <FiShoppingCart className="w-4 h-4 text-green-600" />
                  ) : activity.type === 'inventory' ? (
                    <FiPackage className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <FiTrendingUp className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <FiClock className="w-3 h-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sales by Category
          </h2>
          <PieChartDemo />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

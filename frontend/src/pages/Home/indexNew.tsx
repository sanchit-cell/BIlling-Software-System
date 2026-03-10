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
import { StatsSkeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import BasicChart from './components/Basic';
import BasicChart2 from './components/Basic2';
import PieChartDemo from './components/Pie';
import {
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
} from '../../provider/queries/Dashboard.query';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';

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

const HomePage = () => {
  const { data: stats, isLoading: statsLoading, isError: statsError } = useGetDashboardStatsQuery();
  const { data: activities, isLoading: activitiesLoading } = useGetRecentActivityQuery(10);

  const getActivityIcon = (type: string, status: string) => {
    const iconClass = status === 'success' ? 'text-green-600' : 
                      status === 'warning' ? 'text-yellow-600' : 
                      status === 'error' ? 'text-red-600' : 'text-blue-600';
    
    switch (type) {
      case 'order':
      case 'payment':
        return <FiShoppingCart className={`w-4 h-4 ${iconClass}`} />;
      case 'inventory':
        return <FiPackage className={`w-4 h-4 ${iconClass}`} />;
      case 'customer':
        return <FiTrendingUp className={`w-4 h-4 ${iconClass}`} />;
      default:
        return <FiTrendingUp className={`w-4 h-4 ${iconClass}`} />;
    }
  };

  const getActivityBgClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30';
    }
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
      {statsLoading ? (
        <StatsSkeleton count={4} />
      ) : statsError ? (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400">
          Failed to load dashboard stats. Please try again.
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
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
      ) : null}

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
          
          {activitiesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4 p-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : activities && activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className={`mt-1 p-2 rounded-full ${getActivityBgClass(activity.status)}`}>
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <FiClock className="w-3 h-3" />
                      {formatRelativeTime(activity.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              type="default"
              title="No recent activity"
              description="Your recent orders, customers and inventory changes will appear here."
            />
          )}
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

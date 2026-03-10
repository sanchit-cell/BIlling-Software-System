import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiPlus, FiDownload, FiFilter } from 'react-icons/fi';
import { useGetAllOrdersQuery } from '../../provider/queries/Orders.query';
import BredCrums from '../../components/BredCrums';
import { 
  SearchInput, 
  Button, 
  EmptyState, 
  TableSkeleton,
  Pagination,
  Badge 
} from '../../components/ui';
import { useDebounce } from '../../hooks/useDebounce';
import AddOrderModel from './components/AddOrder.model';
import TableCard from './components/Card.order';

const OrdersPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [SearchParams] = useSearchParams();
  
  const [search, setSearch] = useState(SearchParams.get('query') || '');
  const debouncedSearch = useDebounce(search, 300);
  
  const currentPage = Number(SearchParams.get('page')) || 1;
  
  const { data, isLoading, isError, isFetching } = useGetAllOrdersQuery({
    query: debouncedSearch,
    page: currentPage,
  });

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('query', debouncedSearch);
    params.set('page', '1');
    
    if (debouncedSearch !== (SearchParams.get('query') || '')) {
      navigate(`/orders?${params.toString()}`, { replace: true });
    }
  }, [debouncedSearch]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.set('query', search);
    params.set('page', String(page));
    navigate(`/orders?${params.toString()}`);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <EmptyState
          type="default"
          title="Something went wrong"
          description="We couldn't load your orders. Please try again."
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
      </div>
    );
  }

  const orders = data?.data || [];
  const hasOrders = orders.length > 0;
  const showEmptySearch = !isLoading && !hasOrders && debouncedSearch;
  const showEmptyState = !isLoading && !hasOrders && !debouncedSearch;

  return (
    <div className="space-y-6">
      <BredCrums PageLink="/orders" PageName="Orders" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all your customer orders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            leftIcon={<FiDownload className="w-4 h-4" />}
            className="hidden sm:flex"
          >
            Export
          </Button>
          <Button
            variant="primary"
            leftIcon={<FiPlus className="w-4 h-4" />}
            onClick={() => setVisible(true)}
          >
            Add Order
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search orders by name, email, or ID..."
          className="flex-1 max-w-md"
        />
        <Button
          variant="outline"
          leftIcon={<FiFilter className="w-4 h-4" />}
          className="sm:w-auto"
        >
          Filters
        </Button>
      </div>

      {/* Stats Summary */}
      {hasOrders && (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Showing {orders.length} orders
          </span>
          {isFetching && (
            <Badge variant="info">Updating...</Badge>
          )}
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : showEmptySearch ? (
        <EmptyState
          type="search"
          title="No orders found"
          description={`No orders match "${debouncedSearch}". Try a different search term.`}
        />
      ) : showEmptyState ? (
        <EmptyState
          type="orders"
          actionLabel="Create First Order"
          onAction={() => setVisible(true)}
        />
      ) : (
        <>
          {/* Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order: any, index: number) => (
                    <TableCard key={order._id || index} id={index + 1} data={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            hasMore={data?.hasMore}
            onPageChange={handlePageChange}
            className="mt-6"
          />
        </>
      )}

      {/* Add Order Modal */}
      <AddOrderModel visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default OrdersPage;

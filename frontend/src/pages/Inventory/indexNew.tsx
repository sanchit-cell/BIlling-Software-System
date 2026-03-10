import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiPlus, FiDownload, FiFilter, FiAlertCircle } from 'react-icons/fi';
import { useGetAllitemsQuery } from '../../provider/queries/Items.query';
import BredCrums from '../../components/BredCrums';
import {
  SearchInput,
  Button,
  EmptyState,
  TableSkeleton,
  Pagination,
  Badge,
} from '../../components/ui';
import { useDebounce } from '../../hooks/useDebounce';
import TableCard from './Components/Card.inventory';
import Model from './Components/Model.inventory';

const InventoryPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [SearchParams] = useSearchParams();

  const [search, setSearch] = useState(SearchParams.get('query') || '');
  const debouncedSearch = useDebounce(search, 300);

  const currentPage = Number(SearchParams.get('page')) || 1;

  const { isLoading, data, isFetching, isError } = useGetAllitemsQuery({
    query: debouncedSearch,
    page: currentPage,
  });

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('query', debouncedSearch);
    params.set('page', '1');

    if (debouncedSearch !== (SearchParams.get('query') || '')) {
      navigate(`/inventory?${params.toString()}`, { replace: true });
    }
  }, [debouncedSearch]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.set('query', search);
    params.set('page', String(page));
    navigate(`/inventory?${params.toString()}`);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <EmptyState
          type="default"
          title="Something went wrong"
          description="We couldn't load your inventory. Please try again."
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
      </div>
    );
  }

  const items = data?.items || [];
  const hasItems = items.length > 0;
  const lowStockCount = items.filter((item: any) => item.quantity <= 10).length;
  const showEmptySearch = !isLoading && !hasItems && debouncedSearch;
  const showEmptyState = !isLoading && !hasItems && !debouncedSearch;

  return (
    <div className="space-y-6">
      <BredCrums PageLink="/inventory" PageName="Inventory" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Inventory
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your product inventory and stock levels
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
            Add Item
          </Button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && !isLoading && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
          <FiAlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Low Stock Alert
            </p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              {lowStockCount} item{lowStockCount > 1 ? 's' : ''} need restocking
            </p>
          </div>
          <Button variant="outline" size="sm">
            View Items
          </Button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search items by name or SKU..."
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
      {hasItems && (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Showing {items.length} items
          </span>
          {isFetching && <Badge variant="info">Updating...</Badge>}
        </div>
      )}

      {/* Content */}
      {isLoading || isFetching ? (
        <TableSkeleton rows={5} columns={7} />
      ) : showEmptySearch ? (
        <EmptyState
          type="search"
          title="No items found"
          description={`No items match "${debouncedSearch}". Try a different search term.`}
        />
      ) : showEmptyState ? (
        <EmptyState
          type="inventory"
          actionLabel="Add First Item"
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
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((item: any, index: number) => (
                    <TableCard key={item._id || index} id={index + 1} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            hasMore={data?.more}
            onPageChange={handlePageChange}
            className="mt-6"
          />
        </>
      )}

      {/* Add Item Modal */}
      <Model visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default InventoryPage;

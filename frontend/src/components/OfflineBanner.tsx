import React from 'react';
import { FiWifiOff, FiRefreshCw } from 'react-icons/fi';
import { Button } from './ui/Button';

interface OfflineBannerProps {
  onRetry?: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ onRetry }) => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div className="bg-yellow-50 dark:bg-yellow-900/90 border border-yellow-200 dark:border-yellow-700 rounded-xl shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
            <FiWifiOff className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
              You're offline
            </h4>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
              Some features may not be available until you're back online.
            </p>
          </div>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className="flex-shrink-0"
            >
              <FiRefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Toast notification for connection changes
export const useConnectionStatus = () => {
  const [wasOffline, setWasOffline] = React.useState(false);

  React.useEffect(() => {
    const handleOffline = () => setWasOffline(true);
    const handleOnline = () => {
      if (wasOffline) {
        // Show "back online" toast - integrate with your toast system
        console.log('Back online!');
        setWasOffline(false);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  return { isOnline: navigator.onLine };
};

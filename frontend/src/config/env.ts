// Environment validation and configuration

// Helper to get environment variables with fallbacks
const getEnvVar = (key: string, fallback?: string): string => {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    console.warn(`Environment variable ${key} is not defined`);
    return '';
  }
  return value || fallback || '';
};

// Configuration object
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_NODE_ENV === 'production'
      ? getEnvVar('VITE_BACKEND_URL_PRODUCTION')
      : getEnvVar('VITE_BACKEND_URL_LOCAL'),
    timeout: 30000,
  },
  
  // Environment
  env: {
    isDevelopment: import.meta.env.VITE_NODE_ENV !== 'production',
    isProduction: import.meta.env.VITE_NODE_ENV === 'production',
    nodeEnv: getEnvVar('VITE_NODE_ENV', 'development'),
  },
  
  // Third-party services
  services: {
    recaptchaSiteKey: getEnvVar('VITE_SITE_KEY'),
    stripePublicKey: getEnvVar('VITE_STRIPE_PUBLIC_KEY'),
  },
  
  // Feature flags
  features: {
    darkMode: true,
    exportToPdf: true,
    notifications: true,
    stripePayments: !!getEnvVar('VITE_STRIPE_PUBLIC_KEY'),
  },
  
  // UI Configuration
  ui: {
    defaultPageSize: 10,
    maxPageSize: 50,
    toastDuration: 4000,
    debounceDelay: 300,
  },
};

// Validate required environment variables on app start
export const validateEnv = (): void => {
  const required = ['VITE_BACKEND_URL_LOCAL', 'VITE_SITE_KEY'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0 && config.env.isDevelopment) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
};

export default config;

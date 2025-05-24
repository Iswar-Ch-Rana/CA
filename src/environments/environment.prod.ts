export const environment = {
  production: true,
  apiUrl: 'https://api.excellenceca.com/api/v1',
  frontendUrl: 'https://excellenceca.com',
  appName: 'CA Professional Website',
  version: '1.0.0',
  features: {
    enableLogging: false,
    enableAnalytics: true,
    enableServiceWorker: true
  },
  api: {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  }
};

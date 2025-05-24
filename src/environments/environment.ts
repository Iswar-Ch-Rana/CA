export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api/v1',
  frontendUrl: 'http://localhost:4200',
  appName: 'CA Professional Website',
  version: '1.0.0',
  features: {
    enableLogging: true,
    enableAnalytics: false,
    enableServiceWorker: false
  },
  api: {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  }
};

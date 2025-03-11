import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './theme-override.css';


// MSW
async function initializeMocks() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { worker } = await import('./lib/mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
      });
      console.log('MSW initialized successfully');
    } catch (error) {
      console.error('Failed to initialize MSW:', error);
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

initializeMocks();
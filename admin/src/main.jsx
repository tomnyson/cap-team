import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <ToastProvider>
            <App />
          </ToastProvider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </AuthProvider>
);

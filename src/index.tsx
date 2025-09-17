import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthServiceProvider } from './contexts/AuthServiceContext';
import { TodoServiceProvider } from './contexts/TodosContext';

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthServiceProvider>
      <TodoServiceProvider>
        <App />
      </TodoServiceProvider>
    </AuthServiceProvider>
  </React.StrictMode>
);


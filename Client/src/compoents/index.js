import React from 'react';
import ReactDOM from 'react-dom/client'; // Update for React 18
import App from './App';
import './index.css'; // Assuming you have a CSS file for styling

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

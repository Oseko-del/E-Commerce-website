import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Hardcode API Base URL for simplicity in development
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:5000'; // Removed to allow Vite proxy to handle dynamic LAN IP routing

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

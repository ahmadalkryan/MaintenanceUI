//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import './index.css'
////import { AuthProvider } from './contexts/AuthContext';
////import { NotificationProvider } from './contexts/NotificationContext';
//import App from './App.jsx'

//createRoot(document.getElementById('root')).render(
//    <React.StrictMode>
        
//                <App />
           
//    </React.StrictMode>,
//)
// src/main.jsx
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <App />
);
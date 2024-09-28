import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider, SocketContext } from './constants/SocketContext';
import { AuthProvider } from './constants/AuthContext';
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.render(
    <AuthProvider>
  <ContextProvider>
    
      <App />
   
  </ContextProvider>
  </AuthProvider>,
  document.getElementById('root')
);

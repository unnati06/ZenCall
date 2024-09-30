import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider, SocketContext } from './constants/SocketContext';
import { AuthProvider } from './constants/AuthContext';
import { ClerkProvider } from '@clerk/clerk-react'


ReactDOM.render(
    <AuthProvider>
  <ContextProvider>
    
      <App />
   
  </ContextProvider>
  </AuthProvider>,
  document.getElementById('root')
);

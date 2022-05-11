import React, {useEffect} from 'react';
import { collection, getDocs } from "firebase/firestore";
import { ChatProvider } from './context/chat';
import db, {AuthProvider} from './firebase/firebaseConfig';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './rutas/AppRoutes';
//import  {AuthProvider} from "./context/auth"

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
      <AppRoutes>
        
      </AppRoutes>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;

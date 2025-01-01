// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import AuthContext from './contexts/AuthContext'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setIsAuthenticated(true);


          } else {
            setIsAuthenticated(false);
            setToken(null);
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          setIsAuthenticated(false);
          setToken(null);
          localStorage.removeItem('token');
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [token]);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <LandingPage />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
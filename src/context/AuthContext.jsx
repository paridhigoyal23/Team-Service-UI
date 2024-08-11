import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState(''); // State for user role
  const navigate = useNavigate();

  // Function to handle login
  const login = (email, role) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRole(role); // Set user role on login
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setUserRole(''); // Clear user role on logout
    navigate('/Team-Service-UI/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState(""); // State for user role
  const [userName, setUserName] = useState(""); // State for user name
  const [userEmpId, setUserEmpId] = useState(""); // State for user EmpId
  const navigate = useNavigate();
  console.log(userEmpId);
  // Function to handle login
  const login = async (email, role) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRole(role); // Set user role on login

    try {
      const response = await fetch("http://localhost:8000/users");
      const users = await response.json();

      // Find the user based on the email
      const loggedInUser = users.find((user) => user.email === email);

      if (loggedInUser) {
        setUserName(loggedInUser.Name);
        setUserEmpId(loggedInUser.EmpId);
      } else {
        console.error("User not found:", email);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setUserRole(""); // Clear user role on logout
    setUserName(""); // Clear user name on logout
    setUserEmpId(""); // Clear user EmpId on logout
    navigate("/Team-Service-UI/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        userRole,
        userName,
        userEmpId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Manage user state

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

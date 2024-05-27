import React, { createContext, useState, useContext } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('authToken', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    };
    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return token !== null && token !== '';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

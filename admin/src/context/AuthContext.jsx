import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        setTimeout(() => {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }, 500)
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('authToken', userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');

    };

    const isAuthenticated = () => {
        return localStorage.getItem('currentUser') !== null;
    };

    const getUserInfo = () => {
        return user;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

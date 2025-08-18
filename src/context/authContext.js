// app/context/AuthContext.js
'use client';

import {createContext, useContext, useState} from 'react';

// Create the context with a default value
const AuthContext = createContext({
    user: null, // User object or null
    role: 'guest', // Default role for unauthenticated users
    login: () => {
    },
    logout: () => {
    },
});

// Create the provider component
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('guest');

    // A simple login function to simulate authentication
    const login = (userData) => {
        setUser(userData);
        // Set the role based on user data, e.g., from a database response
        setRole(userData.role || 'user');
    };

    const logout = () => {
        setUser(null);
        setRole('guest');
    };

    // The value that will be provided to consumers
    const value = {
        user,
        role,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a custom hook for easy access to the context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
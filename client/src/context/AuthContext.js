import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isInstructor, setIsInstructor] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            try {
                const userObj = JSON.parse(userData);
                setUser(userObj);
                setIsAdmin(userObj.userType === 'admin');
                setIsInstructor(['admin', 'instructor'].includes(userObj.userType));
                
                // Verify token is still valid
                const response = await authAPI.getCurrentUser();
                if (response.data.user) {
                    // Update user data
                    const updatedUser = response.data.user;
                    setUser(updatedUser);
                    setIsAdmin(updatedUser.userType === 'admin');
                    setIsInstructor(['admin', 'instructor'].includes(updatedUser.userType));
                    
                    // Update localStorage
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    localStorage.setItem('userFirstName', updatedUser.firstName);
                    localStorage.setItem('userLastName', updatedUser.lastName);
                    localStorage.setItem('userEmail', updatedUser.email);
                }
            } catch (error) {
                // Token is invalid, logout user
                logout();
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { token, user } = response.data;
            
            // Store auth data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userFirstName', user.firstName);
            localStorage.setItem('userLastName', user.lastName);
            localStorage.setItem('userEmail', user.email);
            
            // Update state
            setUser(user);
            setIsAdmin(user.userType === 'admin');
            setIsInstructor(['admin', 'instructor'].includes(user.userType));
            
            return { success: true, user };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { token, user } = response.data;
            
            // Store auth data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userFirstName', user.firstName);
            localStorage.setItem('userLastName', user.lastName);
            localStorage.setItem('userEmail', user.email);
            
            // Update state
            setUser(user);
            setIsAdmin(user.userType === 'admin');
            setIsInstructor(['admin', 'instructor'].includes(user.userType));
            
            return { success: true, user };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
            return { 
                success: false, 
                error: errorMessage 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userFirstName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userEmail');
        setUser(null);
        setIsAdmin(false);
        setIsInstructor(false);
    };

    const checkAdmin = () => {
        return isAdmin;
    };

    const checkInstructor = () => {
        return isInstructor;
    };

    const value = {
        user,
        isAdmin,
        isInstructor,
        login,
        register,
        logout,
        loading,
        checkAdmin,
        checkInstructor
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
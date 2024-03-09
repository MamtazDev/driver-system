// UseClientContext.js
'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner'
import Loader from '../components/Loader/Loader';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async () => {
            try {
            } catch (error) {
                console.error('Error initializing user:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
        return () => {

        };
    }, []);

    const login = (userData) => {
        setUser(userData);
    };
    const logout = () => {
        setUser(null);
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Loader />
        </div>
            ;
    }
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

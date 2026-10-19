import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial check for existing token
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    // Assuming there's a /users/me endpoint to get user data from token
                    // If not, we might decoding the token or just rely on its presence
                    // For now, let's try to fetch user details. 
                    // Based on backend file inspection: @router.get("/me",...) exist in users.py
                    const response = await api.get('/users/me');
                    setUser(response.data);
                } catch (err) {
                    console.error("Failed to fetch user profile", err);
                    logout(); // Invalid token
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, [token]);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            // Backend expects UrlEncoded form data or JSON?
            // login.py uses OAuth2PasswordRequestForm which typically expects form data
            // but usually FastApi docs show it as form-urlencoded.
            // Let's try sending as standard form data format which the axios default might not be if we set json.

            const formData = new URLSearchParams();
            formData.append('username', email); // OAuth2 expects 'username', not 'email'
            formData.append('password', password);

            const response = await api.post('/login/access-token', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const { access_token } = response.data;
            setToken(access_token);
            localStorage.setItem('token', access_token);

            // Fetch user data after login
            const userResponse = await api.get('/users/me');
            setUser(userResponse.data);

            return true;
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            // users.py: @router.post("/", response_model=UserSchema)
            // Expects UserCreate schema
            await api.post('/users/', userData);
            // Auto-login or just return success?
            // Let's return success and let the component decide (usually redirect to login)
            return true;
        } catch (err) {
            setError(err.response?.data?.detail || "Registration failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;

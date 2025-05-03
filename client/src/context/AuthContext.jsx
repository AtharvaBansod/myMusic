import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister, logout as apiLogout, refreshToken } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const verifyRefreshToken = async () => {
    //         try {
    //             const storedUser = localStorage.getItem('user');
    //             const newAccessToken = await refreshToken();
    //             setAccessToken(newAccessToken);
    //             if (storedUser) {
    //                 setUser(JSON.parse(storedUser));
    //             }
    //         } catch (error) {
    //             console.log('No valid refresh token');
    //             localStorage.removeItem('accessToken');
    //             localStorage.removeItem('user');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     const token = localStorage.getItem('accessToken');
    //     if (token) {
    //         verifyRefreshToken();
    //     } else {
    //         setLoading(false);
    //     }
    // }, []);


    // AuthContext.jsx

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('accessToken');
                
                if (storedToken && storedUser) {
                    // Immediately set existing token/user
                    setAccessToken(storedToken);
                    setUser(JSON.parse(storedUser));
                    
                    // Attempt silent refresh
                    try {
                        const newAccessToken = await refreshToken();
                        localStorage.setItem('accessToken', newAccessToken);
                        setAccessToken(newAccessToken);
                    } catch (refreshError) {
                        console.log('Silent refresh failed - using existing token', refreshError);
                        // The existing token might still work for a few minutes
                    }
                }
            } catch (error) {
                console.error('Auth initialization error', error);
            } finally {
                setLoading(false);
            }
        };
    
        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const { accessToken, user } = await apiLogin(credentials);
            setAccessToken(accessToken);
            setUser(user);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const { accessToken, user } = await apiRegister(userData);
            setAccessToken(accessToken);
            setUser(user);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiLogout();
        } catch (e) {
            console.warn('Logout request failed:', e);
        } finally {
            setAccessToken(null);
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const value = {
        user,
        accessToken,
        login,
        register,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

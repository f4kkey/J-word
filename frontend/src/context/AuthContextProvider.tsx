import React, { createContext, useContext, useEffect, useState } from 'react'
import { data, Navigate, Outlet, useLocation } from 'react-router-dom'
import { axiosInstance } from '../lib/axios';
import Loader from '../components/Loader';


interface User {
    id: string,
    email: string,
    emailVerified: boolean,
    profilePicture?: string,
    firstName: string,
    lastName: string,
    location: string,
    profileCompletion: boolean
}

interface AuthContextType {
    user: User | null,
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthContextProvider() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();

    const isOnAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/password-reset" ||
        location.pathname === "/verify-email";

    const login = async (email: string, password: string) => {
        try {
            const { data } = await axiosInstance.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("token", data.token)

        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Login failed")
        }
    }

    const signup = async (email: string, password: string) => {
        try {
            const { data } = await axiosInstance.post(
                "/auth/register",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("token", data.token)

        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Login failed")
        }
    }

    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const checkAuth = async () => {
        try {
            const { data } = await axiosInstance.get(
                "auth/getme",
            )
            setUser(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            return;
        }
        checkAuth();
    }, [user, location.pathname])

    if (isLoading) {
        return <Loader />;
    }

    if (!isLoading && !user && !isOnAuthPage) {
        return <Navigate to="/login" />
    }

    if (user && user?.emailVerified && isOnAuthPage) {
        return <Navigate to="/" />
    }

    if (user && !user.emailVerified && location.pathname !== "/verify-email") {
        return < Navigate to="/verify-email" />
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, checkAuth }}>
            <Outlet />
        </AuthContext.Provider>
    )
}

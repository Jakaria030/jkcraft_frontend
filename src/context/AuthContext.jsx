import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, loginUser, logoutUser, registerUser } from "../services/userServices";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setAuthLoading(false);
                return;
            }

            try {
                const res = await getProfile();
                setUser(res?.data);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        fetchUser();
    }, []);

    const register = async (userData) => {
        setAuthLoading(true);

        try {
            const res = await registerUser(userData);
            setUser(res?.data?.data?.user);
            localStorage.setItem("accessToken", res?.data?.accessToken);
            localStorage.setItem("refreshToken", res?.data?.refreshToken);
            return res;
        } finally {
            setAuthLoading(false);
        }
    };

    const login = async (userData) => {
        setAuthLoading(true);

        try {
            const res = await loginUser(userData);
            setUser(res?.data);
            localStorage.setItem("accessToken", res?.data?.accessToken);
            localStorage.setItem("refreshToken", res?.data?.refreshToken);
            return res;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        setAuthLoading(true);

        try {
            await logoutUser();
        } finally {
            setUser(null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setAuthLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, authLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};

export default AuthProvider;
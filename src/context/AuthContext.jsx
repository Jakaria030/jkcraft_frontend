import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../services/userServices";

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
                const res = await getUserProfile();
                setUser(res?.data?.user);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUser(null);
            }
            finally {
                setAuthLoading(false);
            }
        };

        fetchUser();
    }, []);

    const register = async (userData) => {
        setAuthLoading(true);

        try {
            const res = await registerUser(userData);

            localStorage.setItem("accessToken", res?.data?.accessToken);
            localStorage.setItem("refreshToken", res?.data?.refreshToken);

            setUser(res?.data?.user);

            return res;
        } finally {
            setAuthLoading(false);
        }
    };

    const login = async (userData) => {
        setAuthLoading(true);

        try {
            const res = await loginUser(userData);

            localStorage.setItem("accessToken", res?.data?.accessToken);
            localStorage.setItem("refreshToken", res?.data?.refreshToken);

            setUser(res?.data?.user);

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
        <AuthContext.Provider value={{ user, setUser, authLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
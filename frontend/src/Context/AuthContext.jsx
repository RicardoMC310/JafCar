import { createContext, useContext } from "react";
import useStorage from '../utils/useStorage';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useStorage("token", "");
    const [isLogin, setIsLogin] = useStorage("login", false);

    const login = async (email, password) => {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            setToken("")
            setIsLogin(false)
            return;
        }

        setToken(data.token);
        setIsLogin(true);
    }

    const logout = () => {
        setIsLogin(false);
        setToken("");
    }

    return (
        <AuthContext.Provider value={{ token, isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used inside AuthProvider");
    return context;
}
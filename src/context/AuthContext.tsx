import { IAuthContext } from "@/interfaces/components/context/IAuthContext";
import { createContext } from "react";

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
    getToken: () => null,
    getCount: () => 0,
});
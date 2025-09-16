// src/context/AuthServiceContext.tsx

import { createContext, useContext } from "react";
import { AuthService } from "../auth/auth";



// Create a singleton instance
const authService = new AuthService();

const AuthServiceContext = createContext<AuthService>(authService);

export const AuthServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthServiceContext.Provider value={authService}>
            {children}
        </AuthServiceContext.Provider>
    );
};

// Custom hook for convenience
export const useAuthService = () => useContext(AuthServiceContext);
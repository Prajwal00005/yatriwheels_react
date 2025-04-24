import React, { createContext, JSX, useContext, useEffect, useState } from "react";
import { User } from "../modules/auth/types/Login_type";
import axios from "axios";

interface LoginProviderProps {
    children: React.ReactNode;
}

const LoginContext = createContext<User | null | undefined>(undefined);

// const LoginContext = createContext<User | null |undefined>(undefined)


export function LoginProvider({ children }: LoginProviderProps): JSX.Element {


    const [user, setUser] = useState<User | null | undefined>(undefined);

    async function checkUserToken() {
        try {
            const token = localStorage.getItem("token");
            const user = await axios.get("http://localhost:3000/api/v1/auth/check-token",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setUser(user.data);
        } catch (error) {
            setUser(null)
        }
    }

    useEffect(() => {
        checkUserToken()
    }, []);




    return <LoginContext.Provider value={user}>
        {children}
    </LoginContext.Provider>
}

export function useUser() {
    const context = useContext(LoginContext);
    return context;
}
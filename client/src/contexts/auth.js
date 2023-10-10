import { createContext, useEffect, useState } from "react";

export const authContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return <authContext.Provider value={{user, setUser}}>{children}</authContext.Provider>;
}
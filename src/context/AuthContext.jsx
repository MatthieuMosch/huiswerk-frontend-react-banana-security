import {createContext} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {

    return (
        <AuthContext.Provider value={{username: "naam", email: "e-mail", isAuthenticated: false,}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
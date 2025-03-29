import {createContext, useState} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({username: "", email: "", isAuth: false});

    function login() {
        setAuth({...auth, isAuth: true});
    }

    function logout() {
        setAuth({...auth, isAuth: false});
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
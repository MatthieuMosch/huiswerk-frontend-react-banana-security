import {createContext, useState} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({username: "", email: "", isAuth: false});

    function login(username, email) {
        setAuth({...auth, username: "Matthieu", isAuth: true});
    }

    function logout() {
        setAuth({...auth, username: "", email: "", isAuth: false});
    }

    return (
        <AuthContext.Provider value={{...auth, login: login, logout: logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
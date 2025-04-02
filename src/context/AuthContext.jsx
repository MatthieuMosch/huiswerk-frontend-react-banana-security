import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        email: "",
        username: "",
        user: null,
    });

    function login(email, pass) {
        setAuth({...auth, email: email, isAuth: true});
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        setAuth({...auth, username: "", email: "", isAuth: false});
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{...auth, login: login, logout: logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
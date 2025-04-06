import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const uri = "http://localhost:3000";
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        email: "",
        username: "",
        user: null,
        status: "pending"
    });

    async function login(credentials) {
        setErrorMsg("");
        setLoading(true);
        console.log("credentials", credentials);
        try {
            const response = await axios.post(uri + "/login", credentials);
            console.log("response", response);
            if (response.status === 200) {
                setAuth({...auth, isAuth: true});
                console.log("Gebruiker is ingelogd!");
                navigate("/profile");
            }
        } catch (err) {
            setErrorMsg("e-mail en/of wachtwoord zijn niet goed");
            console.error(err);
        } finally {
            // TODO: abort
            setLoading(false);
        }
    }

    function logout() {
        setAuth({...auth, username: "", email: "", isAuth: false});
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{...auth, login: login, logout: logout}}>
            {errorMsg && <dialog open>{errorMsg}</dialog>}
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
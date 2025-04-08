import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {checkJwt} from "../helpers/checkJWT";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const uri = "http://localhost:3000";
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {},
        status: "pending"
    });

    useEffect(() => {
        const jwtStorage = localStorage.getItem("jwt");
        if (jwtStorage && checkJwt(jwtStorage)) {
            void getUser(jwtStorage);
        } else {
            void logout();
        }

    }, [])

    async function getUser(jwt) {
        setErrorMsg("");
        setLoading(true);
        localStorage.setItem("jwt", jwt);
        const decodedJWT = jwtDecode(jwt);
        try {
            const response = await axios.get(
                `${uri}/600/users/${decodedJWT.sub}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    }
                })
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                }
            });
        } catch (err) {
            setErrorMsg(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function login(credentials) {
        setErrorMsg("");
        setLoading(true);
        try {
            const response = await axios.post(uri + "/login", credentials);
            if (response.status === 200) {
                setAuth({...auth, isAuth: true});
                console.log("Gebruiker is ingelogd!");
                void getUser(response.data.accessToken);
                navigate("/profile");
            }
        } catch (err) {
            setErrorMsg(err.response.data);
            console.error(err);
        } finally {
            // TODO: abort
            setLoading(false);
        }
    }

    function logout() {
        setAuth({...auth, user: {}, isAuth: false});
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{...auth, login, logout}}>
            {children}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
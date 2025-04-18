import axios from "axios";
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Link} from 'react-router-dom';
import InputField from "../components/InputField";

function SignUp() {
    const uri = "http://localhost:3000";
    const controller = new AbortController();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const {login} = useContext(AuthContext);
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    },[]);

    async function register() {
        setErrorMsg("");
        setLoading(true);
        try {
            const response = await axios.post(
                uri + "/register", formState, {signal: controller.signal,});
            if (response.status === 201) {
                console.log("User registered successfully.");
                login({email: formState.email, password: formState.password});
            }
        } catch (err) {
            setErrorMsg(err.response.data);
            console.error("Error", err);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        void register();
    }

    return (
        <>
            <h1>Registreren</h1>
            {loading && <p>Loading....</p>}
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="username"
                    placeholder="Gebruikersaam"
                    value={formState.username}
                    changeHandler={handleChange}
                >
                    Gebruikersnaam::
                </InputField>
                <InputField
                    type="email"
                    name="email"
                    placeholder="naam@domein"
                    value={formState.email}
                    changeHandler={handleChange}
                >
                    E-mail:
                </InputField>
                <InputField
                    type="password"
                    name="password"
                    placeholder=""
                    value={formState.password}
                    changeHandler={handleChange}
                >
                    Wachtwoord:
                </InputField>
                <button className="form-button" type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
            {errorMsg && <dialog open>Registratie mislukt: {errorMsg}</dialog>}
        </>
    );
}

export default SignUp;
import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import InputField from "../components/InputField";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [formState, setFormState] = useState({
        email: "",
        pass: "",
    })
    function handleChange(e) {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        login(formState.email, formState.pass);
    }
    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    changeHandler={handleChange}
                >
                    E-mail:
                </InputField>
                <InputField
                    type="password"
                    name="pass"
                    placeholder="Password"
                    value={formState.pass}
                    changeHandler={handleChange}
                >
                    Wachtwoord:
                </InputField>

                <button className="form-button" type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;
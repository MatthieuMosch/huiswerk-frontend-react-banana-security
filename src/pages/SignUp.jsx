import {useContext, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import InputField from "../components/InputField";

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const {login} = useContext(AuthContext);
    const uri = "http://localhost:3000";
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        pass: "",
    })

    async function register() {
        try {
            setErrorMsg("");
            setLoading(true);
            const response = await axios.get(uri);
            console.log("response", response);
        } catch(e) {
            setErrorMsg(e.message);
            console.error("foutje", e);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        register();
    }

    return (
    <>
      <h1>Registreren</h1>
        {loading && <p>Loading....</p>}
        {errorMsg && <p>error: {errorMsg}</p>}
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit}>
          <InputField
              type="text"
              name="name"
              placeholder="Naam"
              value={formState.name}
              changeHandler={handleChange}
          >
              Naam::
          </InputField>
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
          <button className="form-button" type="submit">Registreren</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;
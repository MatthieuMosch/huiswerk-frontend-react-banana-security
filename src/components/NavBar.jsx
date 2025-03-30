import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const {username, isAuth, login, logout} = useContext(AuthContext);

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

      <div>
        <p><strong>{username} is ingelogd:</strong> {isAuth.toString()}</p>
        {/*<button onClick={}></button>*/}
        <button
          type="button"
          onClick={isAuth ? logout : login}
        >
          {isAuth ? "Log out" : "Log in"}
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
        >
          Registreren
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
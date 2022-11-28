import { useRef, useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const REGISTER_URL = '/Authentication/register';

const Register = () => {

  //after successfull login, set new auth state to global context (so the whole app?)
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const firstnameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();
  const successRef = useRef();

  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  //put focus on user input box
  useEffect(() => {
    firstnameRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [firstname, surname, username, email])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(REGISTER_URL, JSON.stringify({ firstname, surname, username, email }),
          {
              headers: { 'Content-Type': 'application/JSON' },
              withCredentials: false
          });

        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;

        //save all of our info in auth object, which is saved in global context
        setAuth({ firstname, surname, username, email, roles, accessToken });

        setFirstname('');
        setSurname('');
        setUsername('');
        setEmail('');

        if (response?.status === 201) {
          setSuccessMsg('Check your mail inbox!');
        }
        
        // Navigates to home page
        //navigate(from, { replace: true });

    } catch (err) {
        if (!err?.response) {
            setErrMsg('No server response');
        } else if (err.response?.status === 400) {
            //400 status is harcoded given by backend
            setErrMsg('Missing username or password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Register failed');
        }
        //set focus on error display, so a screenreader can read info
        errRef.current.focus();
      }
}

return (
  <section className="form-section">
      <p ref={errRef} className={errMsg ? "error-msg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <p ref={successRef} className={successMsg ? "success-msg" : "offscreen"} aria-live="assertive">{successMsg}</p>
      <h1>Registreren</h1>

      <form onSubmit={handleSubmit}>
        <input
            type="firstname"
            id="firstname"
            ref={firstnameRef}
            autoComplete="off"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            required
            placeholder="Voornaam"
        />
        <input
            type="surname"
            id="surname"
            ref={surnameRef}
            autoComplete="off"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            required
            placeholder="Achternaam"
        />
        <input
            type="username"
            id="username"
            ref={usernameRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            placeholder="Gebruikersnaam"
        />
        <input
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Email"
        />
        <button>Registreren</button>
      </form>
      <div className="form-redirect">
          <p>Al een account?</p>
          <span className="line">
              <Link to="/login">Inloggen</Link>
          </span>
      </div>
  </section>
)
}

export default Register

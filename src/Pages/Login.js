import { useRef, useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
//import '../SignUpIn.css'
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/login';

const Login = () => {

    //after successfull login, set new auth state to global context (so the whole app?)
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    //put focus on user input box
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
      setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post(LOGIN_URL, JSON.stringify({ email: user, password: pwd }),
              {
                  headers: { 'Content-Type': 'application/JSON' },
                  withCredentials: true
              });

          console.log(JSON.stringify(response?.data));
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;

          //save all of our info in auth object, which is saved in global context
          setAuth({ user, pwd, roles, accessToken });
          setUser('');
          setPwd('');
          navigate(from, { replace: true });


      } catch (err) {
          if (!err?.response) {
              setErrMsg('No server response');
          } else if (err.response?.status === 400) {
              //400 status is harcoded given by backend
              setErrMsg('Missing username or password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login failed');
          }
          //set focus on error display, so a screenreader can read info
          errRef.current.focus();
      }
  }

  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Inloggen</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
            />
            {/*value: to clear input on submission*/}

            <label htmlFor="password">Wachtwoord:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
            />
            <button>Inloggen</button>
        </form>

        <p>
            Nog geen account?<br />
            <span className="line">
                <Link to="/signup">Registreer</Link>
            </span>
        </p>
    </section>
  )
}

export default Login

import { useRef, useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
// import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UPDATEUSER_URL = '/User';

function UserDetails() {
  // const { id } = 1;
  // const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const mailAddressRef = useRef();
  const errRef = useRef();
  const successRef = useRef();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [mailAddress, setMailAddress] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  
  // const handleChange = (e) => {
  //   console.log(e);
  // };

  useEffect(() => {
    axios.get(`http://localhost:8082/api/User/1`)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUserName(response.data.userName);
        setMailAddress(response.data.mailAddress);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMsg('');
    setSuccessMsg('');

    try {
      const response = await axios.put(UPDATEUSER_URL, JSON.stringify({ firstName, lastName, userName, mailAddress, id: 1 }),
        {
            headers: { 'Content-Type': 'application/JSON' },
            withCredentials: false
        });

      console.log(JSON.stringify(response?.data));
      console.log(response);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      // //save all of our info in auth object, which is saved in global context
      // setAuth({ firstName, lastName, user, email, roles, accessToken });

      setFirstName(firstName);
      setLastName(lastName);
      setUserName(userName);
      setMailAddress(mailAddress);

      if (response?.status === 200) {
        setSuccessMsg('Successfully updated!');
      }
      
      // Navigates to home page
      //navigate(from, { replace: true });

    } catch (err) {
      if (!err?.response) {
          console.log(err);
          console.log(!err?.response)
          setErrMsg('No server response');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg(err.response.data);
          // setErrMsg('Update failed');
      }
      //set focus on error display, so a screenreader can read info
      errRef.current.focus();
    }
  }

  return (
    <section className="form-section">
      <p ref={errRef} className={errMsg ? "error-msg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <p ref={successRef} className={successMsg ? "success-msg" : "offscreen"} aria-live="assertive">{successMsg}</p>
      <h1>Gegevens aanpassen</h1>

      <form onSubmit={handleSubmit}>
        <input
            type="firstname"
            id="firstname"
            ref={firstNameRef}
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
            placeholder="Voornaam"
        />
        <input
            type="lastname"
            id="lastname"
            ref={lastNameRef}
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
            placeholder="Achternaam"
        />
        <input
            type="username"
            id="username"
            ref={userNameRef}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
            placeholder="Gebruikersnaam"
        />
        <input
            type="email"
            id="email"
            ref={mailAddressRef}
            autoComplete="off"
            onChange={(e) => setMailAddress(e.target.value)}
            value={mailAddress}
            required
            placeholder="Email"
        />
        <button>Aanpassen</button>
      </form>
  </section>
  );
}

export default UserDetails;

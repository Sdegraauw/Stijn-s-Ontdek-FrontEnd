import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FormSignup() {
  const initialvalues = { username: "", email: "", password: "" };
  const [inputs, setInputs] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(inputs));
    axios
      .post("http://localhost:8082/api/Authentication/register", inputs)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="form-signup">
      <form className="form" onSubmit={handleSubmit}>
        <h1> Vul hier uw gegevens in om een account aan te maken</h1>
        <div className="form-input">
          <label htmlFor="username" className="form-label">
            Gebruikersnaam
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            placeholder="Gebruikersnaam"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.Username}</p>
        <div className="form-input">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.Email}</p>
        <div className="form-input">
          <label htmlFor="password" className="form-label">
            Wachtwoord
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Wachtwoord"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.Password}</p>
        <div className="form-input">
          <label htmlFor="password2" className="form-label">
            Herhaal Wachtwoord
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Herhaal wachtwoord"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.Password}</p>
        <div>
          <button className="form-input-btn" type="submit">
            Sign up
          </button>
          <span className="form-input-login">
            Heb je al een account?
            <Link to="/Login"> hier</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default FormSignup;

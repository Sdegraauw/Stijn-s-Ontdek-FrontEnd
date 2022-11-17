import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FormSignup() {
  const initialvalues = { firstname: "", surname: "", username: "", email: "" };
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
    if (formErrors == false) {
      axios
      .post("http://localhost:8082/api/Authentication/register", inputs)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = "Voornaam moet ingevuld zijn";
    }
    if (!values.surname) {
      errors.surname = "Achternaam moet ingevuld zijn";
    }
    if (!values.username) {
      errors.username = "Gebruikersnaam moet ingevuld zijn";
    }
    if (!values.email) {
      errors.email = "Email moet ingevuld zijn";
    }
    return errors;
  };

  return (
    <div className="form-signup">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="firstname" className="form-label">
            Voornaam
          </label>
          <input
            name="firstname"
            type="text"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.firstname}</p>
        <div className="form-input">
          <label htmlFor="surname" className="form-label">
            Achternaam
          </label>
          <input
            name="surname"
            type="text"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.surname}</p>
        <div className="form-input">
          <label htmlFor="username" className="form-label">
            Gebruikersnaam
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.username}</p>
        <div className="form-input">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <p>{formErrors.email}</p>
        <div>
          <button className="form-input-btn" type="submit">
            Registreren
          </button>
          <span className="form-input-login">
            <Link to="/Login">Heb je al een account?</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
export default FormSignup;
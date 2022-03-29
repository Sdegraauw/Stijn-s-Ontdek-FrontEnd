import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FormSignup() {
  const initialvalues = { Username: "", Email: "", Password: "" };
  const [inputs, setInputs] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(inputs));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(inputs);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!values.Username) {
      errors.Username = "Username is required";
    }
    if (!values.Email) {
      errors.Email = "Email is required";
    }
    if (!values.Password) {
      errors.Password = "Password is required";
    }
    return errors;
  };
  return (
    <div className="form-signup">
      <pre>{JSON.stringify(inputs, undefined, 2)}</pre>
      <form className="form" onSubmit={handleSubmit}>
        <h1> Vul hier uw gegevens in van het station!</h1>
        <div className="form-input">
          <label htmlFor="Username" className="form-label">
            Username
          </label>
          <input
            name="Username"
            type="text"
            className="form-control"
            placeholder="Enter your Username"
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.Username}</p>
        <div className="form-input">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            name="Email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.Email}</p>
        <div className="form-input">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            name="Password"
            type="password"
            className="form-control"
            placeholder="Enter your Password"
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.Password}</p>
        <div className="form-input">
          <label htmlFor="password2" className="form-label">
            Repeat Password
          </label>
          <input
            name="Password"
            type="password"
            className="form-control"
            placeholder="Repeat your password"
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.Password}</p>
        <div>
          <button className="form-input-btn" type="submit">
            Sign up
          </button>
          <span className="form-input-login">
            Already have an account? login
            <Link to="/Login"> here</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default FormSignup;

import { useState } from "react";
import React from "react";

function RegisterStation() {
  // states for Registration
  const inputvalues = { name: "", adress: "", height: "" };
  const [inputs, setInputs] = useState(inputvalues);
  //States for checking errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(inputs));
    setSubmitted(true);
  };

  //Showing success message
  const successMessage = () => {
    return (
      <div className="success" style={{ display: submitted ? "" : "none" }}>
        <h1> Station succesfully registered! </h1>
      </div>
    );
  };
  // Showing error message is error is true
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h1>please enter all the fields</h1>
      </div>
    );
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!values.name) {
      errors.name = "name is required";
    }
    if (!values.adress) {
      errors.adress = "adress is required";
    }
    if (!values.height) {
      errors.height = "Password is required";
    }
    return errors;
  };

  return (
    <div className="form">
      <div>
        <h1>Station Registration</h1>
      </div>

      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <div className="form-input">
          <label className="label">name</label>
          <input
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
            name="name"
            type="text"
          />
          <label className="label">adress</label>
          <input
            onChange={handleChange}
            className="form-control"
            placeholder="Adress"
            name="adress"
            type="text"
          />
          <div className="form-input">
            <label className="label">height</label>
            <input
              onChange={handleChange}
              placeholder="Height"
              className="form-control"
              name="height"
              type="text"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterStation;

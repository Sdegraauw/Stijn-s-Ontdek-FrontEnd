import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function UserDetails() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const handleChange = (e) => {
    console.log(e);
  };

  const handleSubmit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/User/1`, {})
      .then((response) => {
        setUserData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="labels">Gebruikersnaam</label>
          <input
            name="username"
            placeholder="Gebruikersnaam"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
          <label className="labels">Email</label>
          <input
            name="Email"
            placeholder="Email"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
          <label className="labels">Wachtwoord</label>
          <input
            name="Password"
            placeholder="Wachtwoord"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
          <label className="labels">Herhaal Wachtwoord</label>
          <input
            name="Password2"
            placeholder="Herhaal Wachtwoord"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
          <button>Update mijn data!</button>
        </div>
      </form>
    </>
  );
}

export default UserDetails;

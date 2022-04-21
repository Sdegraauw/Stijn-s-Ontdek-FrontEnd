import React, { useState } from "react";

export default function Login() {
  const [details, setDetails] = useState({ name: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };
  const adminUser = {
    name: "admin@gmail.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "" });
  const [error, setError] = useState("");

  const LoggingIn = (details) => {
    console.log(details);

    if (
      details.name == adminUser.name &&
      details.password == adminUser.password
    ) {
      console.log("Ingelogd");
      setUser({
        name: details.name,
      });
    } else {
      console.log("onjuiste gegevens ingevuld");
      setError("onjuiste gegevens ingevuld");
    }
  };
  const Logout = () => {
    console.log("Logout");
    setUser({ name: "" });
  };

  {
    {
      user.name != "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <Login Login={LoggingIn} error={error} />
      );
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100 card-margin">
        <div className="card">
          <div className="card-header">
            <h3>Inloggen</h3>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div>
                {error != "" ? <div className="error">{error}</div> : ""}
              </div>
              <div className="input-group form-group login-boxes-margin">
                <input
                  type="email"
                  className="form-control"
                  placeholder="gebruikersnaam"
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                  value={details.name}
                />
              </div>
              <div className="input-group form-group login-boxes-margin">
                <input
                  type="password"
                  className="form-control"
                  placeholder="wachtwoord"
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                />
              </div>
              <div className="form-group center login-button-margin">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-info login_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Nog geen account?<a href="#">Registreer</a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="#">Wachtwoord vergeten?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

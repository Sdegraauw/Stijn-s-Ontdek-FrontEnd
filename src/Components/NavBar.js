import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="app">
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary justify-content-between">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarLinks"
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">
          Ontdekstation013
        </a>
        <div className="navbar-nav justify-content-end" id="navbarLinks">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                {" "}
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {" "}
                Over ons
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Signup">
                {" "}
                Registreren
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Register">
                {" "}
                Registreer Station
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Map">
                {" "}
                Kaart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Account">
                {" "}
                Account
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Userdetails">
                {" "}
                Gebruiker Details
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Stations">
                {" "}
                Stations
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar-section">
      <nav className="navbar navbar-expand-sm justify-content-between">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarLinks"
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">
          Ontdekstation013
        </a>
        <div className="navbar-nav justify-content-end" id="navbarLinks">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">Over ons</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Account">Mijn stations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Userdetails">Mijn gegevens</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;

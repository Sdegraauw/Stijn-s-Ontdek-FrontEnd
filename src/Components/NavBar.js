import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar-section">
      <nav className="navbar navbar-expand-lg justify-content-between">
        {/* Brand */}
        <a className="navbar-brand" href="/">Ontdekstation</a>

        {/* Collapse button */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
          aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse justify-content-end" id="navbar">
          {/* Container for links */}
          <ul className="navbar-nav mr-auto">
            {/* Links */}
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

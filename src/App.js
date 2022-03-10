import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import {Nav, Navbar, Container} from 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="app">
      
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Ontdekstation013</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Link to="/login"> Login</Link>
        </li>
        <li class="nav-item">
        <Link to="/"> Home</Link>
        </li>
        <li class="nav-item">
        <Link to="/about"> About</Link>
        </li>      
      </ul>
    </div>
  </div>
</nav>


      {/* <nav>
        <Link to="/"> Home</Link>
        <Link to="/login"> Login</Link>
        <Link to="/about"> About</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

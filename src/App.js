import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";
import FormSignup from "./Pages/FormSignup";
import RegisterStation from "./Pages/RegisterStation";
import Unauthorized from './Pages/Unauthorized';
import Admin from './Pages/Admin';

import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import NavBar from "./Pages/NavBar";

const ROLES = {
  'User': 2001,
  'Admin': 5150
}

function App() {
  return (
    <>
      <NavBar> </NavBar>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<FormSignup />} />
          <Route path="Unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route element={<PersistLogin />}>
              <Route path="Register" element={<RegisterStation />} />
              {/* multiple route can be placed in here */}
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route element={<PersistLogin />}>
              <Route path="Admin" element={<Admin />} />
            </Route>
          </Route>


          {/* catch all , 404 page*/}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

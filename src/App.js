import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import FormSignup from "./components/FormSignup";
import RegisterStation from "./components/RegisterStation";
import Unauthorized from "./components/Unauthorized";
import Admin from "./components/Admin";
import MapPage from "./components/MapPage";

import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <>
      <NavBar> </NavBar>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<FormSignup />} />
          <Route path="Unauthorized" element={<Unauthorized />} />
          <Route path="Map" element={<MapPage />} />

          {/* we want to protect these routes */}
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route element={<PersistLogin />}> */}
          <Route path="Register" element={<RegisterStation />} />
          {/* multiple route can be placed in here */}
          {/* </Route>
          </Route> */}

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

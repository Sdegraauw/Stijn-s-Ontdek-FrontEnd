import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";
import ErrorPage from "./Components/ErrorPage";
import FormSignup from "./Components/FormSignup";
import RegisterStation from "./Components/RegisterStation";
import Unauthorized from "./Components/Unauthorized";
import Admin from "./Components/Admin";
import EditStation from "./Components/EditStation";
import Layout from "./Components/Layout";
import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import NavBar from "./Components/NavBar";
import Account from "./Components/Account";
import Station from "./Components/Station";
import MapPage from "./Components/MapPage";


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
          <Route path="/Edit/:stationId" element={<EditStation />} />
          <Route path="Unauthorized" element={<Unauthorized />} />
          <Route path="Map" element={<MapPage />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Station/:id" element={<Station />}/>

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


import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";
import ErrorPage from "./Components/ErrorPage";
import Register from "./Components/Register";
import RegisterStation from "./Components/RegisterStation";
import Unauthorized from "./Components/Unauthorized";
import Admin from "./Components/Admin";
import StationsTable from "./Components/StationsTable";
import EditStation from "./Components/EditStation";
import Layout from "./Components/Layout";
import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import NavBar from "./Components/NavBar";
import Account from "./Components/Account";
import Station from "./Components/Station";
import UserDetails from "./Components/UserDetails";
import Verify from "./Components/Verify"
import RegisterStationCode from "./Components/RegisterStationCode";
import RegisterStationName from "./Components/RegisterStationName";
import RegisterStationHeight from "./Components/RegisterStationHeight";
import RegisterStationData from "./Components/RegisterStationData";
import RegisterStationVisibility from "./Components/RegisterStationVisibility";
import Router from "./routes";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <>
      <NavBar />
      <Router />
    </>
  );
}

export default App;

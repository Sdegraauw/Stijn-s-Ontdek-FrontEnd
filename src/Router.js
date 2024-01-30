import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./Components/Layout";
function Router() {
    return (
        <Routes>
            <Route className="container" path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />

                {/* catch all , 404 page*/}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default Router
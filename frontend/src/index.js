import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contact,
} from "./components";

import axios from "axios";

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

/* 
  This is where the routing of the entire app takes place. 
  Note how the NavLinks from Navigation.jsx route to the same paths as these routes. 
*/
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route index element={<Navigate to="/home" />} />
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);
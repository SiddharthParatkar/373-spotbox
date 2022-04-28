import React, { useEffect, useState } from "react";
import axios from "axios";
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

function App() {
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    // This line pulls the url and then breaks it up into two pieces [0] contains 
    // everything before code= in the url and [1] contains everything after which
    // is just the code to send back to the server to verify.
    const code = window.location.href.split('code=')[1];
    if (code !== undefined) {
      setloggedIn(true);
    }
    // const data = {code: code}
    // axios.post("http://localhost:3002/code", data);
  },[loggedIn]);

  return (
    <div>
      <Navigation loggedIn={loggedIn}/>
      <Outlet context={[loggedIn, setloggedIn]}/>
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
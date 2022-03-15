import React from "react";
import "./Header.css"
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography
} from "@mui/material";

import { Link } from "react-router-dom";



function Navigation() {

  return (
    // Change the color here to change the navigation bar's color, should be an RBG value in hexadecimal
    <AppBar style={{ background: '#2E3B55' }} position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className="logo">
          Spotbox Program
        </Typography>
          <div className="navlinks">
            <Link to="/" className="navlink">
              Home
            </Link>
            <Link to="/about" className="navlink">
              About
            </Link>
            <Link to="/contact" className="navlink">
              Contact
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navigation;
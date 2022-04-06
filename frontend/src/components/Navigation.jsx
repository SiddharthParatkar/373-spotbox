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
    <AppBar position="static" className="nav">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className="logo">
          Spotbox Program
        </Typography>
          <div className="navlinks">
            <Link to="/" className="navlink">
              Find Spotboxes
            </Link>
            <Link to="/about" className="navlink">
              About Spotboxes
            </Link>
            <Link to="/contact" className="navlink">
              Contact Us!
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navigation;
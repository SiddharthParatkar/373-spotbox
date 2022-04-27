import React from "react";
import axios from "axios";
import "./Header.css"
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography
} from "@mui/material";

import {NavLink} from "react-router-dom"; 
import {TwitterLoginButton} from "react-social-login-buttons";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn:false};
  }

  componentDidMount() {
    console.log("on Mount");
    console.log(this.props.location.search);
  }

  render() { 
    function loginWithTwitter() {
      axios.get("http://localhost:3002/")
        .then((response) => {
          window.location.href=response.data;
        })
    }
  
    function LoggedInOption(){
      console.log(this.props);
      console.log(this.state)
      if(this.props.isLoggedIn) {
        return null;
      } else {
        return <TwitterLoginButton className="navlink" onClick={loginWithTwitter} />
      }
    }
  
    // const isLoggedIn = checkQueryParams();
    return (
      // Change the color here to change the navigation bar's color, should be an RBG value in hexadecimal
      <AppBar position="static" className="nav">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className="logo">
            Spotbox.info
          </Typography>
            {/* These are all the navigation links that allow the routing to take place. 
            NavLink is used over Link because it interacts minimally with the React Router, 
            and allows for the .navlinks.active property to be used. */}
            <div className="navlinks">
              {LoggedInOption()}
              <NavLink to="/home" className="navlink">
                Find Spotboxes
              </NavLink>
              <NavLink to="/about" className="navlink">
                About Spotboxes
              </NavLink>
              <NavLink to="/contact" className="navlink">
                Contact Us!
              </NavLink>
            </div>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navigation;
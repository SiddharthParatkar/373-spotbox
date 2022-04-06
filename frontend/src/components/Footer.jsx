import React from "react";
import "./Footer.css"

// const container = {
//   width: '70%',
//   // display: 'flex',
//   alignItems: 'center',
//   paddingLeft: '10%',
  
// };

function Footer() {
  return (
    <div className="footer">
      <footer className="bg-dark fixed-bottom">
        <div className="container">
          <p>
            Patchy Fog &copy; 2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
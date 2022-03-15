import React from "react";

const container = {
  width: '70%',
  // display: 'flex',
  alignItems: 'center',
  paddingLeft: '10%'
};

function Footer() {
  return (
    <div className="footer">
      <footer class="py-5 bg-dark fixed-bottom">
        <div class="container">
          <p class="m-0 text-center text-white" style={container}>
            Copyright &copy; Your Website 2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
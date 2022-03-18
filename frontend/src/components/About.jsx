import React from "react";

const container = {
  width: '70%',
  alignItems: 'center',
  paddingLeft: '10%'
};

function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5" style={container}>
            <h1 class="font-weight-light">About</h1>
            <p>
              [Interactive Map in ArcGIS]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
import React from "react";
import "./Home.css"

const container = {
  width: '70%',
  alignItems: 'center',
  paddingLeft: '10%'
};

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5" style = {container}>
            <h1 class="font-weight-light">Find Spotboxes</h1>
            <p>
              <iframe title="kodiak" src="https://www.arcgis.com/home/webmap/viewer.html?webmap=76da1f90f78e42c5a573456af6c8fbb0">
              </iframe>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
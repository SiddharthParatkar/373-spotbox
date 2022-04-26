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
          <div class="col-lg-5" style={container}>
            <h1 class="font-weight-light">Find Spotboxes</h1>
            <p>
              {/* This iframe is displaying the map based on the link provided. */}
              <div class="embed-container">
                <iframe width="500" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="Spotboxes in service" src="//www.arcgis.com/apps/Embed/index.html?webmap=76da1f90f78e42c5a573456af6c8fbb0&extent=-152.55,57.7531,-152.2109,57.8607&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light">

                </iframe>
              </div>
              <div class="form">
                <iframe title="form" src="https://docs.google.com/forms/d/e/1FAIpQLSe7z4DLwHx0rKYtP98eS5F-Z71RGD0BteF0vhknAF4_8BnThA/viewform?embedded=true" width="640" height="765" frameborder="0" marginheight="0" marginwidth="0">
                  Loading…
                </iframe>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
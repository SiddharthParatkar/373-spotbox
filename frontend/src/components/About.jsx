import React from "react";
import "./About.css"

/*
  You can add basic CSS to classes in your .jsx files as well.
*/
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
            <h1 class="font-weight-light title">About Spotboxes</h1>
            <p>
              The Spotbox Initiative was started in Kodiak, Alaska during the Covid-19 lockdown by a team of teachers, determined to get students out of the house and into nature.<br /><br />
              Historically, the boxes have contained information and activites relevant to their locations to encourage learning about the area while actually there! <br /><br /> 
              If you would like to explore our initiative further, check out our <a href="https://www.twitter.com"> network of users </a> or find a Spotbox near you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
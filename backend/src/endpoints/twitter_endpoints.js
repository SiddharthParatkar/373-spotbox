const axios = require('axios')
require('dotenv').config({ path: './../secret.env' });

function getTwitterUserData(request, response) {

  const username = request.body.username;
  const url = "https://api.twitter.com/2/users/by/username/";
  const params = "?user.fields=public_metrics"
  axios.get(url + username + params,
  {
    headers: {
      'Authorization': 'Bearer ' + process.env.TWITTER_API_BEARER_TOKEN}
  }).then(res => {

    const public_metrics = res.data.data.public_metrics;

    // Below, there are functions called status. This adds a status code to the request. 
    // These are standardized numbers and a full list can be viewed here: 
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    if(res.status != 200) {
      response.status(500).send("Error on our end. Please report this to the Twitter group so we can resolve it!");
    }
    
    else if (public_metrics.followers_count < 10 || public_metrics.following_count < 10) {
      response.status(403).send("Ineligible user permissions.\n Must have at least 10 followers and be following 10 accounts.");
    } 
    
    else {
      response.status(200).send("Baseline conditions met");
    }
  }).catch(error => {
    console.error(error);
    response.status(500).send("Error on our end. Please report this to the Twitter group so we can resolve it!");
  }) 
} 

exports.getTwitterUserData = getTwitterUserData;
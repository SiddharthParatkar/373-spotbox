const axios = require('axios')
require('dotenv').config({ path: './../secret.env' });

function getTwitterUserData(username) {
  axios.get("https://api.twitter.com/2/users/by/username/" + username,
  {
    headers: {
      'Authorization': 'Bearer ' + process.env.TWITTER_API_BEARER_TOKEN}
    }).then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  }) 
} 

exports.getTwitterUserData = getTwitterUserData;
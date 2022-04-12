const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {getTwitterUserData} = require("./endpoints/twitter_endpoints");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//TODO: Add documentation for api (like what is request/response loop)
app.post('/twitter-user', (request, response) => {
  getTwitterUserData();
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}/`);
});
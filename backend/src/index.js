const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: './secret.env' });

const {getTwitterUserData} = require("./endpoints/twitter_endpoints");
const {pkceURLBuilder, codeValidator} = require('./endpoints/pkce_helper');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

//TODO: Add documentation for api (like what is request/response loop)
app.post('/twitter-user', (request, response) => {
  getTwitterUserData(request, response);
})

app.get('/', (request, response) => {
  pkceURLBuilder(request, response)
})

app.post('/code', (request, response) => {
  codeValidator(request, response);
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}/`);
});
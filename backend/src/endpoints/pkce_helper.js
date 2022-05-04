const pkceChallenge = require("pkce-challenge").default;
require('dotenv').config({ path: './secret.env' });

let challenges = []
// Relevant Documentation: https://developer.twitter.com/en/docs/authentication/oauth-2-0/user-access-token
function pkceURLBuilder(req, res) {
  // PKCE challenge is used here as a security measure. 
  const codeChallenge = pkceChallenge(128);
  const domain = "https://twitter.com/i/oauth2/authorize"

  let queryParams = [`client_id=${process.env.TWITTER_CLIENT_ID}`];
  queryParams.push(`code_challenge=${codeChallenge.code_challenge}`);
  queryParams.push(`redirect_uri=http://localhost:3000/home`);
  queryParams.push(`code_challenge_method=S256`);
  queryParams.push(`response_type=code`);
  queryParams.push('state=state');
  // %20 is a special character that translates to a space. All characters on a 
  // computer are encoded this way and can be referenced in what is called an 
  // ASCII Table. https://commons.wikimedia.org/wiki/File:ASCII-Table-wide.svg
  queryParams.push(`scope=offline.access%20users.read%20follows.read%20like.read`);
  const url = domain + "?" + queryParams.join('&');
  challenges.push(codeChallenge);
  res.status(200).send(url);
}

function codeValidator(req, res) {
  console.log(req.body);
  console.log(challenges);

  const data = {
    code:'VGNibzFWSWREZm01bjN1N3dicWlNUG1oa2xRRVNNdmVHelJGY2hPWGxNd2dxOjE2MjIxNjA4MjU4MjU6MToxOmFjOjE',
    grant_type:'authorization_code',
    redirect_uri:"https://www.example.com",
    code_verifier:'challenge'
  }

  const config = {
    Authorization: 'Basic V1ROclFTMTRiVWhwTWw4M2FVNWFkVGQyTldNNk1UcGphUTotUm9LeDN4NThKQThTbTlKSXQyZm1BanEzcTVHWC1icVozdmpKeFNlR3NkbUd0WEViUA=='
  }

  axios.post("https://api.twitter.com/2/oauth2/token", data, config)

  if(challenges.indexOf(req.body.code) != -1) {
    res.status(200).send("Done");
  } else {
    res.status(400).send("Bad Request");
  }

}

exports.pkceURLBuilder = pkceURLBuilder;
exports.codeValidator = codeValidator;
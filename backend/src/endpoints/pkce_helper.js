const pkceChallenge = require("pkce-challenge").default;
require('dotenv').config({ path: './secret.env' });

//Relevant Documentation: https://developer.twitter.com/en/docs/authentication/oauth-2-0/user-access-token
function pkceURLBuilder(req, res) {
  //PKCE challenge is used here as a security measure. 
  const codeChallenge = pkceChallenge(128);
  const domain = "https://twitter.com/i/oauth2/authorize"

  let queryParams = [`client_id=${process.env.TWITTER_CLIENT_ID}`];
  queryParams.push(`code_challenge=${codeChallenge.code_challenge}`);
  // queryParams.push(`code_verifier=${codeChallenge.code_verifier}`);
  queryParams.push(`redirect_uri=http://localhost:3000/home`);
  queryParams.push(`code_challenge_method=S256`);
  queryParams.push(`response_type=code`);
  queryParams.push('state=state');
  // %20 is a special character that translates to a space. All characters on a 
  // computer are encoded this way and can be referenced in what is called an 
  // ASCII Table. https://commons.wikimedia.org/wiki/File:ASCII-Table-wide.svg
  queryParams.push(`scope=offline.access%20users.read%20follows.read%20like.read`);
  const url = domain + "?" + queryParams.join('&');
  res.send(url);
}

exports.pkceURLBuilder = pkceURLBuilder
const oauth = require('oauth');
const axios = require('axios');

const TWITTER_CONSUMER_API_KEY = process.env.TWITTER_CONSUMER_API_KEY;
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.TWITTER_CONSUMER_API_SECRET_KEY;

const OAuth2 = oauth.OAuth2;
const oauthConsumer = new OAuth2(
  TWITTER_CONSUMER_API_KEY,
  TWITTER_CONSUMER_API_SECRET_KEY,
  'https://api.twitter.com/', 
  null,
  'oauth2/token', 
  null);

async function oauthGetUserById (userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) {
  return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
    .then(body => JSON.parse(body))
}
async function getOAuthAccessTokenWith ({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
      return error
        ? reject(new Error('Error getting OAuth access token'))
        : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
    })
  })
}
async function getOAuthRequestToken () {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthRequestToken2(function (error, oauthRequestToken, oauthRequestTokenSecret, results) {
      return error
        // ? reject(new Error('Error getting OAuth request token. ' + error))
        ? reject(console.log(error))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
    })
  })
}

function twitterAuthHandler (method = 'authorize') {
  return async (req, res) => {
    console.log(`/twitter/${method}`)
    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()
    console.log(`/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

    req.session = req.session || {}
    req.session.oauthRequestToken = oauthRequestToken
    req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

    const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to ', authorizationUrl)
    res.redirect(authorizationUrl)
  }
}

function twitterLogout (req, res, next) {
  res.clearCookie('twitter_screen_name')
  req.session.destroy(() => res.redirect('/'))
}


async function twitterCallback(req,res) {
  const { oauthRequestToken, oauthRequestTokenSecret } = req.session
  const { oauth_verifier: oauthVerifier } = req.query
  console.log('/twitter/callback', { oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })

  const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
  req.session.oauthAccessToken = oauthAccessToken

  const { user_id: userId /*, screen_name */ } = results
  const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })

  req.session.twitter_screen_name = user.screen_name
  res.cookie('twitter_screen_name', user.screen_name, { maxAge: 900000, httpOnly: true })

  console.log('user succesfully logged in with twitter', user.screen_name)
  req.session.save(() => res.redirect('/'))
}

async function plainCall(req, res) {
  axios.get("https://twitter.com/i/oauth2/authorize?response_type=code&client_id=M1M5R3BMVy13QmpScXkzTUt5OE46MTpjaQ&redirect_uri=https://www.example.com&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain")
}


exports.twitterAuthHandler = twitterAuthHandler;
exports.twitterLogout = twitterLogout;
exports.twitterCallback = twitterCallback;
exports.plainCall = plainCall;
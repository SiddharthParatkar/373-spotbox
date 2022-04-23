const express              = require('express');
const cors                 = require('cors');
const passport             = require('passport')
const TwitterStrategy      = require('passport-twitter');

/*
This avenue seems like it would work except it is targetting a version of the API I cant use. 
Twitter for some reason hides their old version of the API behind elevated privileges, but makes
their new one publically acessible... I don't have the elevated privileges and even if I did, our 
client wouldn't.
relevant git issue is explained here: https://github.com/jaredhanson/passport-twitter/issues/110
*/
require('dotenv').config({ path: './secret.env' });

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(require('express-session')({ secret: 'spotboxHero', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3002/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
  User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  app.listen(port, () => {
    console.log(`Server listening on localhost:${port}/`);
  });
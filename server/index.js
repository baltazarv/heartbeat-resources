const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
// const jwt = require('jwt-simple');
// const KEY = process.env.JWT_KEY;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const port = process.env.PORT || 3000;
app.use(require('body-parser').json());
app.engine('html', require('ejs').renderFile);
app.use(passport.initialize());
// const { google } = require('googleapis');

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

try {
  const env = require('../env.js');
  Object.keys(env).forEach( key => process.env[key] = env[key]);
}
catch (ex) {
  console.log('provide env values!!');
}

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;
const HOST = 'http://localhost:3000';

// app.get('/', (req, res, next) => res.render(
//   path.join(__dirname, '/public/index.html'),
//   { GOOGLE_API_KEY: process.env.GOOGLE_API_KEY }
// ));

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_CALLBACK_URL) {

  passport.use(new GoogleStrategy({
      clientID: '233510703288-ehvnpauq3r2t2mc6gbfdpk4il28gfpaa.apps.googleusercontent.com',
      clientSecret: 'cVDRmvNJf4rD3l6GsTIxPjxZ',
      callbackURL: `${HOST}/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
      return done(null, 'success');
    }
  ));
  // clientID: GOOGLE_CLIENT_ID,
  // clientSecret: GOOGLE_CLIENT_SECRET,
  // callbackURL: `${HOST}/auth/google/callback`

  app.get('/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  }));

  app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  }),
  function(req, res){
    console.log('google callback');
    // const token = req.user.generateToken();
    res.redirect(`/?access_token=token`);
    // res.redirect(`/?token=${token}`);
  });

}

app.use((err, req, res, next) => {
  console.log('ERR', err);
  res.status(err.status || 500).send(err);
});

module.exports = app;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));


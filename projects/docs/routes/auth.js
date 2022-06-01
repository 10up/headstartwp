const express = require('express');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

const router = express.Router();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/oauth2/redirect/google',
			scope: ['profile'],
		},
		function verify(issuer, profile, cb) {
			return cb(null, profile);
		},
	),
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username, name: user.name });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

router.get(
	'/oauth2/redirect/google',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login',
	}),
);

router.get('/login', function (req, res) {
	res.redirect('/login/federated/google');
});

router.get('/login/federated/google', passport.authenticate('google'));

module.exports = router;

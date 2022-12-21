require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);

const authRouter = require('../routes/auth');

const redisClient = new Redis(
	`rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
);

const app = express();
const port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(passport.authenticate('session'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', passport.authenticate('session'));
app.use('/', (req, res, next) => {
	if (!req.user) {
		return res.redirect('/login');
	}

	return next();
});

// app.use(express.static(path.join(__dirname, '../static')));

app.use((req, res) => {
	if (req.url === '/') {
		return res.sendFile(path.join(__dirname, '../static/index.html'));
	}
	const url = req.url.endsWith('/') ? req.url : `${req.url}/`;
	return res.sendFile(path.join(__dirname, `../static/${url}`));
});

app.listen(port);

console.log(`Server started at http://localhost:${port}`);

module.exports = app;

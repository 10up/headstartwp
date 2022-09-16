const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const Redis = require('ioredis');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
	.then(() => {
		const redisClient = new Redis(
			`rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
		);

		redisClient.subscribe('isr-revalidate-request', (err, count) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log(`Subscribed to ${count} channels.`);
		});

		redisClient.on('message', async (channel, message) => {
			if (channel === 'isr-revalidate-request') {
				try {
					const { path } = JSON.parse(message);
					console.log('on message', path);

					const cachedPath = await app.server.incrementalCache.cacheHandler.get(path);
					console.log(cachedPath);

					if (cachedPath) {
						console.log('flushing', path);
						app.server.incrementalCache.cacheHandler.memoryCache.del(path);
					}
				} catch (err) {
					// do nothing
				}
			}
		});
		createServer(async (req, res) => {
			console.log(app.server.incrementalCache.cacheHandler);
			try {
				// Be sure to pass `true` as the second argument to `url.parse`.
				// This tells it to parse the query portion of the URL.
				const parsedUrl = parse(req.url, true);

				await handle(req, res, parsedUrl);
			} catch (err) {
				console.error('Error occurred handling', req.url, err);
				res.statusCode = 500;
				res.end('internal server error');
			}
		}).listen(port, (err) => {
			if (err) throw err;
			console.log(`> Ready on http://${hostname}:${port}`);
		});
	})
	.catch((err) => console.log(err));

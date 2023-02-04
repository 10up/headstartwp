/**
 * Some hosting requires a health-check endpoint to monitor site availability
 *
 * @param {*} req Next.js request
 * @param {*} res Next.js response
 */
export default function handler(req, res) {
	res.status(200).send('Ok');
}

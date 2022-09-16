/**
 * Some hosting requires a health-check endpoint to monitor site avaliabiliy
 *
 * @param {*} req Next.js request
 * @param {*} res Next.js response
 */
export default function handler(req, res) {
	res.status(200).send('Ok');
}

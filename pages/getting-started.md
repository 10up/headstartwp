If you're new to Next.js, we recommend reviewing [Next.js docs](https://nextjs.org/docs/getting-started).

## System Requirements

- Node.js 16 or later
- NPM >= 7
- WordPress >= 5.9 (prior versions might work but haven't been tested).

## Installation

The easiest way to get started with 10up's headless framework is by using `create-next-app` with the official starter project.

```bash
npx create-next-app --use-npm -e https://github.com/10up/headless-docs/tree/projects-develop/wp-nextjs
```
Then run `npm run dev` and open http://localhost:3000 in your browser.

### Environment Variables

By default the starter project will point to js1.10up.com. Either change the 
`NEXT_PUBLIC_HEADLESS_WP_URL` variable or create a `.env.local` file to override the default env variables.

If you're developing locally and using HTTPS with WordPress and you don't have valid certs, you will need to add `NODE_TLS_REJECT_UNAUTHORIZED=0` as a env variable

```
NEXT_PUBLIC_HEADLESS_WP_URL=https://wordpress.test
NODE_TLS_REJECT_UNAUTHORIZED=0`
```

## Something Missing?

If something is missing in the documentation or if you found some part confusing, please file an [issue](https://github.com/10up/headless/issues) for the documentation repository with your suggestions for improvement.
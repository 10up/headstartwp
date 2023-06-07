# wp-nextjs project

> This is a [Next.js](https://nextjs.org/) project bootstrapped with 10up's Headless Framework.

[![wp-nextjs Project GPLv2 License](https://img.shields.io/badge/wp--nextjs%20package-GPLv2-orange)](https://github.com/10up/headstartwp/blob/develop/projects/wp-nextjs/LICENSE.md)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

By default the starter project will point to js1.10up.com. Either change the 
`NEXT_PUBLIC_HEADLESS_WP_URL` variable or create a `.env.local` file to override the default env variables.

If you're developing locally and using HTTPS with WordPress and you don't have valid certs, you will need to add `NODE_TLS_REJECT_UNAUTHORIZED=0` as a env variable

> A framework for building headless WordPress sites.

## Overview

## Instructions for development & running this monorepo
Run the following commands from the root of the repo:
- `npm install` 
- `npm run dev` 

The top-level `dev` command will boot up the `projects/wp-nextjs` project and start `tsc` in watch mode for all packages.

## Instructions for using the framework
> These are temporary instructions

- Do a clean git clone this repo
- Copy `projects/wp-nextjs` to a different folder
    - `cp -R ./projects/wp-nextjs /path-to-my-project`
- Make sure there isn't a `node_modules` folder under `/path-to-my-project`.
- `cd /path-to-my-project && npm install`
- `npm run dev`

## Documentation
- Getting Started
- API Reference
    - [@10up/headless-core](./packages/core)
    - [@10up/headless-next](./packages/next)
- Guides

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Repository Structure and Engineering Guidelines
Visit the [CONTRIBUTING](/CONTRIBUTING.md) page for initial contribution and engineering guidance.

This repository is a monorepo, under the `packages` there are all the tools that are published to npm. The `projects` directory is a collection of tests projects linked to the tools in `packages` and is used for testing purposes.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="10up"></a>

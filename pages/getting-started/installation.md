
## Automatic Setup


## Manual Setup

## Instructions for using the framework
> These are temporary instructions

- Do a clean git clone this repo
- Copy `projects/wp-nextjs` to a different folder
    - `cp -R ./projects/wp-nextjs /path-to-my-project`
- Make sure there isn't a `node_modules` folder under `/path-to-my-project`.
- `cd /path-to-my-project`
- `npm install`
- `npm run dev`

## Instructions for development & running this monorepo

Run the following commands from the root of the repo:
- `npm install` 
- `npm run dev` 

The top-level `dev` command will boot up the `projects/wp-nextjs` project and start `tsc` in watch mode for all packages.
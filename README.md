
# HeadstartWP

> A framework for building headless WordPress sites.

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level) [![eslint](https://github.com/10up/headless/actions/workflows/eslint.yml/badge.svg)](https://github.com/10up/headless/actions/workflows/eslint.yml) [![PHPCS check](https://github.com/10up/headless/actions/workflows/phpcs.yml/badge.svg)](https://github.com/10up/headless/actions/workflows/phpcs.yml) [![unit tests](https://github.com/10up/headless/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/10up/headless/actions/workflows/unit-tests.yml)
[![Core Package MIT License](https://img.shields.io/badge/core%20package-MIT-green)](https://github.com/10up/headless/blob/develop/packages/core/LICENSE.md) [![Hooks Package MIT License](https://img.shields.io/badge/hooks%20package-MIT-green)](https://github.com/10up/headless/blob/develop/packages/hooks/LICENSE.md) [![Next Package MIT License](https://img.shields.io/badge/next%20package-MIT-green)](https://github.com/10up/headless/blob/develop/packages/next/LICENSE.md)
[![wp-multisite-i18n-nextjs Project GPLv2 License](https://img.shields.io/badge/wp--multisite--i18n--nextjs%20project-GPLv2-orange)](https://github.com/10up/headless/blob/develop/projects/wp-multisite-i18n-nextjs/LICENSE.md) [![wp-multisite-nextjs Project GPLv2 License](https://img.shields.io/badge/wp--multisite--nextjs%20project-GPLv2-orange)](https://github.com/10up/headless/blob/develop/projects/wp-multisite-nextjs/LICENSE.md) [![wp-nextjs Project GPLv2 License](https://img.shields.io/badge/wp--nextjs%20package-GPLv2-orange)](https://github.com/10up/headless/blob/develop/projects/wp-nextjs/LICENSE.md)
[![HeadstartWP Plugin GPLv2 License](https://img.shields.io/badge/Headless%20WordPress%20plugin-GPLv2-orange)](https://github.com/10up/headless/blob/develop/wp/tenup-headless-wp/LICENSE.md)

## Documentation

See our [Getting Started](https://headstartwp.10up.com/docs/learn/getting-started/quick-setup/) guide.

Visit [headstartwp.10up.com/docs](https://headstartwp.10up.com/docs) for the full documentation.

### Running docs site locally

The docs site lives in the `docs` directory. It is currently not part of the monorepo/workspace setup so `npm install` must be executed in the `docs` dir. To run the docs site locally run the following commands:

```bash
cd docs
npm install
npm run start
```

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Changelog

A complete listing of all notable changes to 10up's Headless Framework are documented in CHANGELOG.md files within the [core](https://github.com/10up/headless/blob/develop/packages/core/CHANGELOG.md), [hooks](https://github.com/10up/headless/blob/develop/packages/hooks/CHANGELOG.md), and [next](https://github.com/10up/headless/blob/develop/packages/next/CHANGELOG.md) packages.

## Repository Structure and Engineering Guidelines

Visit the [CONTRIBUTING](/CONTRIBUTING.md) page for initial contribution and engineering guidance.

This repository is a monorepo, under the `packages` there are all the tools that are published to npm. The `projects` directory is a collection of test projects linked to the tools in `packages` and is used for testing purposes.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="10up" /></a>

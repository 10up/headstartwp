## HeadstartWP Plugin

> All Development happens inside [@10up/headstartwp](https://github.com/10up/headstartwp). This repo is meant for the distribution of the plugin. Please head over to the main monorepo for issues and PRs.

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level) [![Headless WordPress Plugin GPLv2 License](https://img.shields.io/badge/Headless%20WordPress%20plugin-GPLv2-orange)](https://github.com/10up/headstartwp/blob/develop/wp/tenup-headless-wp/LICENSE.md)

## Installation

The recommended method for installing this plugin is via composer: `composer require headstartwp/headstartwp`.

Make sure to set up the path for installing this as a WordPress Plugin:

```json
{
    "name": "your-vendor-name/your-project-name",
    "require": {
        "composer/installers": "^1.0",
        "headstartwp/headstartwp": "^1.0.0"
    },
    "extra": {
        "installer-paths": {
            "plugins/{$name}/": ["type:wordpress-plugin"]
        }
    },
    "config": {
        "allow-plugins": {
            "composer/installers": true
        }
    }
}
```

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="10up"></a>

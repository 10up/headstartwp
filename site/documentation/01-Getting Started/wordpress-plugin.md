---
slug: /getting-started/installing-wordpress-plugin
sidebar_position: 4
---

# Installing WordPress Plugin

The WordPress plugin currently lives in a private Github Repo. Make sure you have access to [this repo](https://github.com/10up/tenup-headless-wp-plugin) before continuing.

> We're in the process of open sourcing the Headless Framework, once this process is complete it will be possible to install the WordPress plugin from [wpackagist](https://wpackagist.org/).

## Composer Installation (Recommended)

Add the plugin's github repository to to your `composer.json` file.

```json
{
    "name": "your-project-name",
    "minimum-stability": "dev",
    "repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:10up/tenup-headless-wp-plugin.git"
        }
    ],
    "require": {
        "10up/tenup-headless-wp": "dev-develop",
    },
    "extra": {
        "installer-paths": {
            "plugins/{$name}/": [
                "type:wordpress-plugin"
            ]
        }
    }
}
```

Then run `composer install` and activate the pluginb.

## Manual install

[Download the plugin's zip file](https://github.com/10up/tenup-headless-wp-plugin/archive/refs/heads/develop.zip), manually move it to `wp-content/plugins` and activate the plugin.

## Enter the front-end site URL.

Go to `Settings -> General` and scroll down until you find the "Headless Frontend URL" and enter the URL for the Headless site.

![Plugin settings](../../static/img/documentation/getting-started/plugin-settings.png)

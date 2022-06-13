## 10up Headless WordPress Plugin

> All Development happens inside [@10up/headless](https://github.com/10up/headless). This repo is meant for distribution of the plugin. Please head over to the main monorepo for issues and PRs.

## Installation

For now the only method for installing this plugin is via composer.

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
    "10up/headless-wp": "dev-develop",
  },
  "extra": {
    "installer-paths": {
	  "plugins/{$name}/": [
	  "type:wordpress-plugin"
	]
  }
}
```

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="10up"></a>

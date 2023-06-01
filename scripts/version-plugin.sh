#!/bin/bash
VERSION=$(cat wp/headless-wp/package.json | jq -r '.version')

sed -i "/HEADLESS_WP_PLUGIN_VERSION/s/'[^']*'/'$VERSION'/2" wp/headless-wp/plugin.php
sed -i "s/.*Version:.*/ \* Version: $VERSION/" wp/headless-wp/plugin.php
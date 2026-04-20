---
slug: /deploying
sidebar_label: Getting Ready
sidebar_position: 0
---

# Getting Ready to deploy

Before deploying we recommend checking out a few things to ensure a smooth launch. Here's a quick checklist:

- Confirm SEO meta tags are working. HeadstartWP has an out-of-the-box integration with the Yoast SEO plugin.
- Confirm your sitemaps are working. If you have the Yoast SEO plugin, HeadstartWP will proxy sitemaps through WP and ensure links are replaced with the front-end links
- Check out your robots.txt, HeadstarWP will proxy it through WP as well.
- Check out ads.txt, HeadstartWP will also proxy it through WP. We recommend installing the [ads.txt](https://wordpress.org/plugins/ads-txt/) plugin.
- Consider setting up application monitoring such as [Datadog](./datadog.md), New-Relic or Sentry.

## Hosting

You can deploy HeadstartWP to any hosting that supports Next.js. We've tested HeadstartWP on a few platforms. Check out our [Hosting](./hosting.md) page for some tips.

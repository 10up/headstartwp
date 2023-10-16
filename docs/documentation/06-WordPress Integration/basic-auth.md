---
slug: /wordpress-integration/basic-auth
---

# Basic Auth

If WordPress is protected by Basic Auth (which is common during development) you can tell HeadstartWP the basic auth creds so that all
REST API requests include them. To do so, simply add the following env variables:

```
WP_BASIC_AUTH_USERNAME=username
WP_BASIC_AUTH_PASSWORD=password
```

:::caution
The above env variables will only be accessible server-side and therefore any client-side requests made directly to WordPress will fail. This happens because Next.js only includes env variables prefixed with `NEXT_PUBLIC_` in the browser bundle.

If you want your client-side requests to work, prefix the above variables with `NEXT_PUBLIC_`. But note that the basic auth creds will be leaked to the public.
:::caution

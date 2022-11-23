---
"@10up/headless-core": patch
---

add js-xss options param to wpKsesPost and expposing sanitizeFn function to BlocksRenderer

## wpKsesPost

e.g

```javascript
wpKsesPost(
    `<p data-post='${JSON.stringify(json_object)}'>Hello World</p>`,
    {
        p: ['data-post'],
    },
    {
        onTag(tag, html, options) {
            if (options.isWhite && tag === 'p') {
                return html;
            }

            return undefined;
        },
    },
),
```

## BlocksRenderer

```javascript
<BlocksRenderer html={html} sanitizeFn={(html) => mySanitizitationFn(html)}>
    {children}
</BLocksRenderer>
```
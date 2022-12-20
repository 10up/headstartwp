# Implementing a Youtube Facade

The headless framework provides an easy way to implement Youtube Facade, in fact, we can do so with one line of code. All that’s needed is to add the YoutubeLiteBlock component

```js
import { BlocksRenderer, YoutubeLiteBlock } from '@10up/headless-core/react';

<BlocksRenderer html={html}>
    {/*... */}
	<YoutubeLiteBlock />
</BlocksRenderer>
```

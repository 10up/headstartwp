# Implementing a Youtube Facade

HeadstartWP provides an easy way to implement Youtube Facade, in fact, we can do so with one line of code. All that’s needed is to add the YoutubeLiteBlock component

```js
import { BlocksRenderer, YoutubeLiteBlock } from '@headstartwp/core/react';

<BlocksRenderer html={html}>
    {/*... */}
	<YoutubeLiteBlock />
</BlocksRenderer>
```

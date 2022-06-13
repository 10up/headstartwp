# useScript

Hook that makes easy to dynamically load an external script and know when it's loaded (or errored). This is specially useful when you're dealing with third party libraries that you don't want on every page (since they could slow page load down) but you might need it for a component.

Common examples of this are embeds which you want to load a script to control it. It's possible to delay adding the script, and it also takes care of duplicated script requests.

## Example usage

```jsx
import { useRef, useEffect } from 'react';
import { useScript } from '@10up/react-hooks';

function YoutubeEmbed( { videoId } ) {
    const [ hasLoaded, hasErrored ] = useScript( 'https://www.youtube.com/iframe_api' );
	  const ref = useRef();
	  const player = useRef();
	  
	  useEffect( () => {
        if ( hasLoaded && ! hasErrored ) {
            player.current = new YT.Player( ref.current, {
                height: '390',
                width: '640',
                videoId,
                playerVars: {
                    'playsinline': 1
                },
            } );
        }
    }, [ hasLoaded, hasErrored ] );
	  
	  return <div ref={ ref } />
}
```

## Arguments

* **source** _`string`_ - Source URL for the script to be loaded.
* **delay** _`number`_ - Amount of milliseconds to wait before appending the script.

### Return

* **Array** - Returns an array with the following elements (for destructuring).

0. **hasLoaded** _`boolean`_ - Whether the script has loaded. Mutually exclusive with `hasErrored`.
1. **hasErrored** _`boolean`_ - Whether the script has errored. Mutually exclusive with `hasLoaded`.
2. **flushCache** _`function`_ - A function that can be called that will flush the cache of loaded scripts, so you can inject them again. If no argument is given it will clear the whole cache. Passing a script source will only clear that script allowing that script only to be injected again.


# useEffectAfterRender

Convenient hook that skips the mount phase when calling your effect. Sometimes you only want an effect to run after a
value has changed, specially on SSR where you have all the initial data.

```jsx
import { useEffectAfterRender } from '@10up/react-hooks';

function MyComponent( { value } ) {
    useEffectAfterRender( () => {
        // Not running on mount, only when `value` has changed
    }, [ value ] );

    return (
        <div>
            <p>Some component</p>
        </div>
    );
}
```

## Arguments

* **callback** _`function`_ - Function to be called once the dependency/dependencies change.
* **deps** _`Array<any>`_ - Dependency array to be passed so effect runs on change.

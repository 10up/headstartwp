# useEvent

A hook that adds an event listener to an element and automatically unsubscribes it on unmount. React does already offer
a way to listen to events and handles most of this automatically but there are instances in which you need to subscribe
to body events or window events.

## Example usage

```jsx
import { useRef } from 'react';
import { useEvent } from '@headless/hooks';

function MyComponent() {
	  const ref = useRef();
    const handleClick = useEvent( ref, 'click', event => {
        // This will be called when the button is clicked
    } );

    return (
        <button ref={ref}>Click me</button>
    );
}
```

## Arguments

* **ref** _`object`_ - React Ref or Object with the same structure where `addEventListener` will be called.
* **eventName** _`string`_ - Event to listen to.
* **handler** _`function`_ - Function to be bound to the event.
* **...rest** _`any`_ - Extra parameters to `addEventListener`, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) for more information.

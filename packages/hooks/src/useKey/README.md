# useKey

Useful wrapper around [useEvent](/packages/hooks/src/useEvent/README.md) to trigger a callback once a Key is pressed it allows several options to match. This is very handy to trigger an effect on a `Escape` key being pressed.

## Example usage

```jsx
import { useRef, useState } from 'react';
import { useKey } from '@headless/hooks';

function MyModal() {
    const [ isOpen, setIsOpen ] = useState( false );
    const ref = useRef();
    // Only called if Escape is pressed
    useKey( ref, 'Escape', () => setIsOpen( false ) );

    return (
        <div ref={ref} role="dialog">
            Dialog
        </div>
    );
}
```

## Arguments

* **ref** _`object`_ - React Ref or Object with the same structure where `addEventListener` will be called.
* **key** _`string|function|any`_ - The key being evaluated which can be of different types for flexibility:
  * If it's a `string` it will be compared against the event's key property to see if it maches.
  * If it's a `function` it will be run with the event for the hook's usage to decide.
  * If it's `any` other type it'll evaluate falsy / truthy to decide.
* **handler** _`function`_ - Function to be called if the above passes. Gets the `KeyboardEvent` as a parameter.

# useOnClickOutside

Hook that lets you register a callback to be called if the user clicks outside a given element. Comes handy to close
menus or modals whenever you need to click outside the element.

## Example usage

```jsx
import { useRef, useState } from 'react';
import { useOnClickOutside } from '@10up/react-hooks';

function MyModal() {
    const ref = useRef();
    const [ isVisible, setIsVisible ] = useState( false );
	
    // Whenever we click out of the modal, it will be hidden
    useOnClickOutside( ref, () => setIsVisible( false ) );

    return (
        <div role="dialog" aria-hidden={ ! isVisible } ref={ ref }>
            <p>Modal Content</p>
        </div>
    );
}
```

## Arguments

* **ref** _`object`_ - React Ref or Object with the same structure to check whether the clicked element is within it or not.
* **handler** _`function`_ - Callback to run once a click happens that's outside the provided element.

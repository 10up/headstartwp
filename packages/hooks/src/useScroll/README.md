# useScroll

Hook that lets you handle scroll events within a React component. This is useful for several types of component such as Scroll Up header, tie an animation to scroll or anything else that you could think of.

```jsx
import { useScroll } from '@headless/hooks';

function ScrollupHeader() {
    const [ isSticky, setIsSticky ] = useState( false );
	  useScroll( ( { prevPos, currPos } ) => {
        // Access to previous position to detect scroll direction
        const isScrollingUp = currPos < prevPos;
		
		    if ( currPos > 100 ) {
				    setIsSticky( true );
        }
    } );
	  
	  return <div ref={ ref } />
}
```

## Arguments

* **callback** _`function`_ - Function to be called on scroll. The function receives an object as an argument with the following properties:
  * **prevPos** _`number`_ - Previous scroll position.
  * **currPos** _`number`_ - Current scroll position.
* **deps** _`Array<any>`_ - Dependency array to be passed so function can be re-wrapped.
* **delay** _`number`_ - Debounce delay.

# useIsTransitioning

This hook leverages a Context that ties into `next/router` events to expose a state variable that you can use to know
whether the page is transitioning to a new one or not.

This is useful on some scenarios such as:

* Animating an element while the page is loading to indicate the user navigation is happening. 
* Reloading ads on when navigation happens.

If the hook is used without the context it will always return `false`.

## Example usage

```jsx
import { TransitionProvider, useIsTransitioning } from '@headless/hooks';

const MyComponent = () => {
    const isTransitioning = useCurrentBreakpoint();
	
    if ( isTransitioning ) {
		    return <p>Is Loading</p>;
    }
	
    return <p>Is not Loading</p>;   
};

ReactDOM.render(
    <TransitionProvider>
        <MyComponent />
    </TransitionProvider>,
    document.getElementById( 'root' ),
);
```

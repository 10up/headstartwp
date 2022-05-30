# useOnWindowResize

A custom hooks that runs a handler when the window resizes. This happens out of a render cycle and will only match if 
the size actually changed. This can be helpful if you need to recalculate bounds or positions based on screen size.

## Example usage

```jsx
import { useOnWindowResize } from '@10up/react-hooks';

function MyComponent() {
	const handleChange = useOnWindowResize( () => {
		// This will be called 300ms after the window has resized
	} );

	return (
		<div/>
	);
}
```

## Arguments

* **handler** _`function`_ - Callback to run once the window has resized. 
* **delay** _`number`_ - Debounce delay. See [useDebouncedCallback](/packages/hooks/src/useDebouncedCallback/README.md). 

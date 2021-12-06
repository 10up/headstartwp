# useIsMounted

A hook that returns a function that lets you retrieve the current mount state. This hook is useful when you have to detect component mount state within async effects.

```jsx
import { useEffect } from 'react';
import { useIsMounted } from '@headless/hooks';

import { fetchPosts } from 'api'; // Fake module 

function MyComponent() {
	const getMountedState = useIsMounted();
	
	useEffect(() => {
		fetchPosts.then(posts => {
			if (getMountedState()) {
				// Safe to modify inner state or accessing refs
      }
    });
  }, []);
	
	return (
		<div />
  )
}
```

## Return

Function that returns a `Boolean` that indicates the current mount state.

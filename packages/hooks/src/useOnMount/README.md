# useOnMount

Runs an effect once the component is mounted. This is useful at times, specially when you are accessing props / state that would get flagged by react-hooks eslint rules.

## Example usage

```jsx
import { useOnMount } from '@10up/react-hooks';

function MyComponent() {
    useOnMount(() => {
		    // Do something here, only once per component mount
    });

    return (
        <div/>
    );
}
```

# useDebounce

This hook allows you to debounce any fast changing value. The debounced value will only reflect the latest value that it got and the specified time has passed. This can be used along `useEffect` to ensure that something like an API call isn't executed too frequently on every key-stroke.

## Example usage

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from '@headless/hooks';

function MyComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                // Do API Call
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    return (
      <div>
          <label htmlFor="field">Search</label>
          <input
              id="field"
              onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
    );
}
```

## Arguments

#### Arguments

* **value** _`any`_ - Value to be debounced.
* **delay** _`number`_ - Debounce delay.

#### Return

* **debouncedValue** - Current value being debounced.

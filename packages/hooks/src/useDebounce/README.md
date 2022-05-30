# useDebounce

This hook allows you to debounce any fast changing value. The debounced value will only reflect the latest value that it got and the specified time has passed. This can be used along `useEffect` to ensure that something like an API call isn't executed too frequently on every key-stroke.

[What is debouncing?](https://css-tricks.com/the-difference-between-throttling-and-debouncing/#debouncing-enforces-that-a-function-not-be-called-again-until-a-certain-amount-of-time-has-passed-without-it-being-called-as-in-execute-this-function-only-if-100-milliseconds-have-passed-witho)

## Example usage

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from '@10up/react-hooks';

function MyComponent() {
    const [ searchTerm, setSearchTerm ] = useState( '' );
    const debouncedSearchTerm = useDebounce( searchTerm, 500 );

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                // Do API Call
            }
        },
        [ debouncedSearchTerm ] // Only call effect if debounced search term changes
    );

    return (
      <div>
          <label htmlFor="field">Search</label>
          <input
              id="field"
              onChange={ ( e ) => setSearchTerm( e.target.value ) }
          />
      </div>
    );
}
```

## Arguments

* **value** _`any`_ - Value to be debounced.
* **delay** _`number`_ - Debounce delay.

### Return

* **debouncedValue** - Current value being debounced.

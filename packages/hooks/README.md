# Hooks

Battle tested hooks that can be reused and are safe to use within SSR environments.

## List

* [`useCurrentBreakpoint`](src/useCurrentBreakpoint/README.md) - Context + Hook to track current CSS breakpoint by leveraging `matchMedia`.
* [`useDebounce`](src/useDebounce/README.md) - Hook to debounce a quickly changing value, so it doesn't re-render as much.
* [`useDebouncedCallback`](src/useDebouncedCallback/README.md) - Hook to debounce an effect that's quickly called.

## Development

You can create a new hook by running `npm run create-hook hookName` which will bootstrap the files for you. You might want to run `npm run create-hook` without any options if you want to see all possible inputs.

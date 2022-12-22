# Hooks

> Battle tested hooks that can be reused and are safe to use within SSR environments.

[![Hooks Package MIT License](https://img.shields.io/badge/hooks%20package-MIT-green)](https://github.com/10up/headless/blob/develop/packages/hooks/LICENSE.md)

## List

* [`useCurrentBreakpoint`](src/useCurrentBreakpoint/README.md) - Context + Hook to track current CSS breakpoint by leveraging `matchMedia`.
* [`useDebounce`](src/useDebounce/README.md) - Hook to debounce a quickly changing value, so it doesn't re-render as much.
* [`useDebouncedCallback`](src/useDebouncedCallback/README.md) - Hook to debounce an effect that's quickly called.
* [`useEffectAfterRender`](src/useEffectAfterRender/README.md) - Hook that only dispatches the effect if the component is mounted.
* [`useEvent`](src/useEvent/README.md) - Hook for `addEventListener` to any element.
* [`useFocusTrap`](src/useFocusTrap/README.md) - Hook to trap focus inside a DOM element. This is great for trapping the focus within a Modal for example.
* [`useIsMounted`](src/useIsMounted/README.md) - Hook that returns a function that will yield the current mount state of the component.
* [`useIsTransitioning`](src/useIsTransitioning/README.md) - Context + Hook that tracks `routeChange` events from [Next's Router](https://nextjs.org/docs/api-reference/next/router).
* [`useKey`](src/useKey/README.md) - A convenient wrapper around [`useEvent`](src/useEvent/README.md) to handle key presses allowing to send either the key being watched, a function to evaluate or any truthy/falsy value.
* [`useOnClickOutside`](src/useOnClickOutside/README.md) - Hook to add a handler to be executed when the user clicks outside a given ref.
* [`useOnMount`](src/useOnMount/README.md) - Hook to add a handler to be executed when the component mounts.
* [`useOnWindowResize`](src/useOnWindowResize/README.md) - Hook to attach a handler to window resize.
* [`useSafeLayoutEffect`](src/useSafeLayoutEffect/README.md) - Alias hook to safely use `useLayoutEffect` within SSR environments.
* [`useScript`](src/useScript/README.md) - Hook to append a script into the page, preventing the same script to be included more than once.

## Development

You can create a new hook by running `npm run create-hook hookName` which will bootstrap the files for you. You might want to run `npm run create-hook` without any options if you want to see all possible inputs.

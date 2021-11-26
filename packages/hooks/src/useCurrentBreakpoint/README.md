# useCurrentBreakpoint

This hooks leverages a Context that lets you define breakpoints for your application and for the component that
leverages the hook to rerender when this happens.

The context can be tweaked to adapt to the project needs, but it comes with sensible defaults.

This hooks comes handy when you need to re-render some third party libraries depending on the current breakpoint or
do completely different layouts based on React logic rather than CSS logic.

## Example usage

```jsx
import { BreakpointsProvider, useCurrentBreakpoint } from '@headless/hooks';

const MyComponent = () => {
	const { breakpoints, currentBreakpoint } = useCurrentBreakpoint();
	
  return currentBreakpoint === breakpoints.sm ? <h1>Mobile Size</h1> : <h1>Other size</h1>;   
};

ReactDOM.render(
	<BreakpointsProvider>
		<MyComponent />
	</BreakpointsProvider>,
	document.getElementById('root'),
);
```

## Hook

The hook **needs** the Context to be wrapping the component.

### Return

Returns an object with the following keys (for easier destructuring):

* `breakpoints`: Defined breakpoints. This is useful to match against keys instead of raw numbers (see example usage).
* `currentBreakpoint`: The current matched breakpoint.

## Context

### Options

These are the options that come by default which can be tweaked:

```jsx
<BreakpointsProvider
    breakpoints={{
      sm: 39.6875, // 635px
      md: 53.125, // 850px
      lg: 64, // 1024px
      xl: 80.9375, // 1295px
    }}
    breakpointUnit="em"
    debounceDelay={300}
    defaultBreakpoint={39.6875}
>
		<MyComponent />
</BreakpointsProvider>
```

#### `breakpoints` _(`object`)_

This is a dictionary of key and a number. Those numbers will be converted to media queries and be run in mobile first 
order (descending and using `min-width`) to determine which breakpoint matches. By default, is:

```js
{
    sm: 39.6875, // 635px
    md: 53.125, // 850px
    lg: 64, // 1024px
    xl: 80.9375, // 1295px
}
```

#### `breakpointUnit` _(`string`)_

The unit that breakpoints will be matched against, by default is `em` but can be switched to `px`.

#### `debounceDelay` _(`number`)_

The amount of milliseconds to debounce the media queries check after the screen has resized. By default, is `300`. 

#### `defaultBreakpoint` _(`number`)_

This is the number that will be returned when no media query matches. This could happen in several scenarios.

* SSR: During Server Side Rendering there's no access to media queries so this will be the default breakpoint returned.
* On smaller breakpoints than the smallest media query. On the default media queries a device of 320px doesn't get matched by `(min-width: 39.6875em)` so it would return the `defaultBreakpoint` value. 

By default, is `39.6875`.

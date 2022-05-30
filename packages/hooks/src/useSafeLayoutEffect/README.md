# useSafeLayoutEffect

Alias for `useLayoutEffect` in the browser but `useEffect` on the server. While most of the time [you want to use `useEffect`](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect) there are instances in which `useLayoutEffect` is needed. 

However, using `useLayoutEffect` will lead to a warning when run within the server.

> Warning: `useLayoutEffect` does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

You should use this hook whenever you want to use `useLayoutEffect`.

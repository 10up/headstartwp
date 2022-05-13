# useFocusTrap

Hook that traps focus within a given node. This is useful for modals, drawers, menus, etc. The Node **must** include at
least one focusable element. It receives a value that will be watched, so it can be optionally enabled/disabled. It
will be automatically disabled on unmount.

## Example usage

```jsx
import { useFocusTrap } from '@headless/hooks';

function MyModal({ isVisible }) {
    const ref = useFocusTrap( isVisible );

    return (
        <div role="dialog" aria-hidden={ ! isVisible } ref={ ref }>
            <button role="button">Close modal</button>
        </div>
    );
}
```

In this example above, once the modal is visible, the `button` inside will receive focus and the user won't be able to
focus out of it.

## Arguments

* **isActive** _`boolean`_ - Enables or disables the focus trap.
* **focusOnActive** _`RefObject<HTMLElement>`_ - An optional reference to another element to focus as the first element.

## Return

* **setRef** - Returns a `setRef` function that can be passed as a `ref` for any element. This will be where the focus trap will attach.

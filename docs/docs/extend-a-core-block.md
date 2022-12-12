# Extending a Core Block

Something that comes up all the time is needing to extend a core block to add your own options to it. A common example is adding lightbox functionality to the core group block. So how can you approach this problem?

## Defining what you need to do

In order to add your new options to another block you need to do a few things:

- Add the attributes that you want to store to the block
- Add the UI for the new option to the block
- Add the new property / class name to the block in the editor
- Add the new property / class name to the block on the frontend

To simplify all these steps the [`@10up/block-components`](https://github.com/10up/block-components) library has a handy function called [`registerBlockExtension`](https://github.com/10up/block-components/tree/develop/api/register-block-extension) which allows you to do all these things.

### Defining new attributes

Since you want to add new attributes to the block you need to create a new object that defines the new attributes you want to add.

```js
const newAttributes = {
    isLightbox: {
        type: 'boolean',
        default: false
    }
};
```

### Create Class Name generator

In order to add the new class name to the block wrapper element both in the editor and the frontend you need to create a function that generated the appropriate class name based on the value of the attributes. In this case you will want to add the `is-lightbox` class only when the `isLightbox` attribute is set to `true`.

```js
function generateClassName( attributes ) {
    const { isLightbox } = attributes;
    let className = '';
    if ( isLightbox ) {
        className = 'is-lightbox';
    }
    return className;
}
```

:::caution
If you extend dynamic blocks that don't store their markup in the database you will need to replicate the logic to add the class name on the frontend manually in php.
:::caution

### Create Editor User Interface

Finally you will need to define the editor UI you want for the new setting. This again is similar to how you would define it for a custom block. You create a react component that gets passed all the props from the block editor and you can use slots like the `InspectorControls` or the `BlockControls` to place your new settings into the sidebar or toolbar of the block.

```js
function LightboxBlockEdit( props ) {
    const { attributes, setAttributes } = props;
    const { isLightbox } = attributes;

    return (
        <InspectorControls>
            <PanelBody title="Lightbox Options">
                <ToggleControl
                    label="Enable Lightbox" 
                    checked={ isLightbox }
                    onChange={ value => setAttributes({ isLightbox: value }) }
                />
            </PanelBody>
        </InspectorControls>
    );
}
```

### Connecting the different Pieces

Now that you have created these new attributes, class name generator function and editor ui you can pass all these values as options to the `registerBlockExtension` api.

```js
import { registerBlockExtension } from '@10up/block-components';

registerBlockExtension(
    `core/gallery`,
    {
        extensionName: 'lightbox',
        attributes: newAttributes,
        classNameGenerator: generateClassName,
        Edit: LightboxBlockEdit
    }
);
```

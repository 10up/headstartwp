# Menu

The `Menu` recursively render menu items from WordPress. It expects a tree-object structure representing menu items as defined below:

```typescript
interface MenuItemEntity {
	ID: number;
	menu_order: number;
	post_type: string;
	post_mime_type: string;
	menu_item_parent: string;
	object_id: string;
	object: string;
	type: string;
	type_label: string;
	url: string;
	title: string;
	target: '_blank' | '_self' | '_parent' | '_top';
	attr_title: string;
	description: string;
	classes: string[];
	slug: string;
	children: MenuItemEntity[];
}
```
The `MenuItemEntity` interface is defined [here](../../src/data/types/entities.ts#L664).

As long as you data structure matches the `MenuItemEntity` interface you can use the Menu component to recursively render your WordPress menus.

## Usage

### Framework agnostic example
```javascript
import { Menu } from '@10up/headless-core';

const Header = ( { menuItems } ) => {
	return (
		<header>
			{!loading && (
				<Menu
					items={menuItems}
				/>
			)}
		</header>
	);
};
```

### Customizing menu rendering
```javascript
import { Menu } from '@10up/headless-core';

const MenuWrapper = ({ className, depth, children }) => {
	if (depth === 0) {
		return (
			<nav>
				<ul className={className}>{children}</ul>;
			</nav>
		);
	}

	return <ul className={className}>{children}</ul>;
};

const ItemWrapper = ({ className, children }) => {
	return (
		<li className={className}>
			<div className="menu-item">{children}</div>
		</li>
	);
};

const LinkWrapper = ({ href, depth, children }) => {
	return (
		<Link href={href}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a>
				{children} <strong>(Level {depth})</strong>
			</a>
		</Link>
	);
};

const Header = ( { menuItems } ) => {
	return (
		<header>
			{!loading && (
				<Menu
					items={menuItems}
				/>
			)}
		</header>
	);
};
```

### Next.js example

```javascript
import { Menu } from '@10up/headless-core';
import { useMenu } from '@10up/headless-next';

const Header = () => {
	const { loading, data } = useMenu('primary');

	return (
		<header>
			{!loading && (
				<Menu
					items={data}
				/>
			)}
		</header>
	);
};
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `items` | `MenuItemEntity`    | **Required**   | The Menu Items object.        |
| `className` | `string` | `'menu-container'` | The className for the menu container. |
| `topLevelItemsClickable` | `boolean` | `false` | Whether top level menu items (those with children) should be clickable or not. Defaults to false. |
| `depth` | `number` | `0` | Not meant to be changed. It's exposed as a prop because the `Menu` component is called recursively. This is passed to the wrapper components to indicate the current level of the menu item. |
| `itemWrapper` | `ItemWrapper` | `DefaultItemWrapper` | An optional ItemWrapper component to customize rendering of menu items. |
| `menuWrapper` | `MenuWrapper` | `DefaultMenuWrapper` | An optional MenuWrapper component to customize rendering of each top level menu. |
| `linkWrapper` | `LinkWrapper` | `DefaultLinkWrapper` | An optional LinkWrapper component to customize rendering of menu item links. If you specify your own LinkComponent to the Settings provider you onl need to pass a custom `linkWrapper` if you want to customize rendering of Links beyond what your default Link component does. |

## Related

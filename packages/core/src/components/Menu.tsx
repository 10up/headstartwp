/* eslint-disable @typescript-eslint/no-use-before-define */
import { PropsWithChildren } from 'react';
import { MenuItemEntity } from '../data';
import { useSettings } from '../provider';
import { removeSourceUrl } from '../utils';
import { RawLink } from './Link';

export type ItemWrapperProps = PropsWithChildren<{
	className: string;
	depth: number;
	item: MenuItemEntity;
}>;
export type ItemWrapper = (props: ItemWrapperProps) => JSX.Element;

export type MenuWrapperProps = PropsWithChildren<{
	className: string;
	depth: number;
}>;
export type MenuWrapper = (props: MenuWrapperProps) => JSX.Element;

export type MenuItemsProp = {
	items: MenuItemEntity[];
	depth: number;
	topLevelItemsClickable: boolean;
	itemWrapper: ItemWrapper;
	menuWrapper: MenuWrapper;
};

const defaultItemWrapper = ({ className, children }: ItemWrapperProps) => (
	<li className={className}>{children}</li>
);

const defaultMenuWrapper = ({ className, children }: MenuWrapperProps) => (
	<ul className={className}>{children}</ul>
);

export const MenuItems = ({
	items,
	depth,
	topLevelItemsClickable,
	itemWrapper,
	menuWrapper,
}: MenuItemsProp) => {
	const settings = useSettings();

	const LinkComponent =
		typeof settings.linkComponent === 'function' ? settings.linkComponent : RawLink;

	return (
		<>
			{items.map((item) => {
				const link = removeSourceUrl({ link: item.url, backendUrl: settings.url || '' });
				const shouldLink = item.children.length === 0 || topLevelItemsClickable;
				const className = `menu-item-depth-${depth}`;
				const ItemWrapper = itemWrapper;

				return (
					<ItemWrapper key={item.ID} className={className} depth={depth} item={item}>
						{shouldLink ? (
							<LinkComponent href={link}>{item.title}</LinkComponent>
						) : (
							item.title
						)}
						{item.children.length > 0 && (
							<Menu
								items={item.children}
								depth={depth + 1}
								menuWrapper={menuWrapper}
								itemWrapper={itemWrapper}
							/>
						)}
					</ItemWrapper>
				);
			})}
		</>
	);
};

type MenuProps = {
	className?: string;
	items: MenuItemEntity[];
	depth?: number;
	topLevelItemsClickable?: boolean;
	itemWrapper?: ItemWrapper;
	menuWrapper?: MenuWrapper;
};

export const Menu = ({
	items,
	className,
	depth = 0,
	topLevelItemsClickable = false,
	itemWrapper = defaultItemWrapper,
	menuWrapper = defaultMenuWrapper,
}: MenuProps) => {
	const classes = [className, `menu-depth-${depth}`];
	const MenuWrapper = menuWrapper;
	return (
		<MenuWrapper className={classes.join(' ')} depth={depth}>
			<MenuItems
				items={items}
				depth={depth}
				topLevelItemsClickable={topLevelItemsClickable}
				menuWrapper={menuWrapper}
				itemWrapper={itemWrapper}
			/>
		</MenuWrapper>
	);
};

Menu.defaultProps = {
	className: 'menu-container',
	topLevelItemsClickable: false,
	depth: 0,
	itemWrapper: defaultItemWrapper,
	menuWrapper: defaultMenuWrapper,
};

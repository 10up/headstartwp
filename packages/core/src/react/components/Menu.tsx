'use client';

/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-use-before-define, react/require-default-props */
import { PropsWithChildren } from 'react';
import type { MenuItemEntity } from '../../data';
import { removeSourceUrl } from '../../utils/removeSourceUrl';

import { useSettings } from '../provider';
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

export type LinkWrapperProps = PropsWithChildren<{
	href: string;
	depth: number;
}>;
export type LinkWrapper = (props: LinkWrapperProps) => JSX.Element;

export type MenuItemsProp = {
	items: MenuItemEntity[];
	depth: number;
	topLevelItemsClickable: boolean;
	itemWrapper: ItemWrapper;
	menuWrapper: MenuWrapper;
	linkWrapper: LinkWrapper;
};

const DefaultItemWrapper = ({ className, children }: ItemWrapperProps) => (
	<li className={className}>{children}</li>
);

const DefaultMenuWrapper = ({ className, children }: MenuWrapperProps) => (
	<ul className={className}>{children}</ul>
);

const DefaultLinkWrapper = ({ href, children }: LinkWrapperProps) => {
	const settings = useSettings();
	const LinkComponent =
		typeof settings.linkComponent === 'function' ? settings.linkComponent : RawLink;

	return <LinkComponent href={href}>{children}</LinkComponent>;
};

export const MenuItems = ({
	items,
	depth,
	topLevelItemsClickable,
	itemWrapper: ItemWrapper,
	menuWrapper: MenuWrapper,
	linkWrapper: LinkWrapper,
}: MenuItemsProp) => {
	const settings = useSettings();

	return (
		<>
			{items.map((item) => {
				const link = removeSourceUrl({
					link: item.url,
					backendUrl: settings.sourceUrl || '',
				});
				const shouldLink = item.children.length === 0 || topLevelItemsClickable;
				const classNames = [`menu-item-depth-${depth}`];

				if (item.children.length) {
					classNames.push('menu-item-has-children');
				}

				return (
					<ItemWrapper
						key={item.ID}
						className={classNames.join(' ')}
						depth={depth}
						item={item}
					>
						{shouldLink ? (
							<LinkWrapper href={link} depth={depth}>
								{item.title}
							</LinkWrapper>
						) : (
							item.title
						)}
						{item.children.length > 0 && (
							<Menu
								items={item.children}
								depth={depth + 1}
								menuWrapper={MenuWrapper}
								itemWrapper={ItemWrapper}
								linkWrapper={LinkWrapper}
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
	linkWrapper?: LinkWrapper;
};

export function Menu({
	items,
	className,
	depth = 0,
	topLevelItemsClickable = false,
	itemWrapper = DefaultItemWrapper,
	menuWrapper = DefaultMenuWrapper,
	linkWrapper = DefaultLinkWrapper,
}: MenuProps) {
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
				linkWrapper={linkWrapper}
			/>
		</MenuWrapper>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace Menu {
	export const defaultProps = {
		className: 'menu-container',
		topLevelItemsClickable: false,
		depth: 0,
		itemWrapper: DefaultItemWrapper,
		menuWrapper: DefaultMenuWrapper,
		linkWrapper: DefaultLinkWrapper,
	};
}

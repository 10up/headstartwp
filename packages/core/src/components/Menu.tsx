/* eslint-disable @typescript-eslint/no-use-before-define */
import { MenuItemEntity } from '../data';
import { useSettings } from '../provider';
import { removeSourceUrl } from '../utils';
import { RawLink } from './Link';

type MenuItemsProp = {
	items: MenuItemEntity[];
	depth: number;
};

export const MenuItems = ({ items, depth }: MenuItemsProp) => {
	const settings = useSettings();

	const LinkComponent =
		typeof settings.linkComponent === 'function' ? settings.linkComponent : RawLink;

	return (
		<>
			{items.map((item) => {
				const link = removeSourceUrl({ link: item.url, backendUrl: settings.url || '' });
				return (
					<li key={item.ID} className={`menu-item-depth-${depth}`}>
						<LinkComponent href={link}>{item.title}</LinkComponent>
						{item.children.length > 0 && (
							<Menu items={item.children} depth={depth + 1} />
						)}
					</li>
				);
			})}
		</>
	);
};

type MenuProps = {
	className?: string;
	items: MenuItemEntity[];
	depth?: number;
};

export const Menu = ({ items, className, depth = 0 }: MenuProps) => {
	const classes = [className, `menu-depth-${depth}`];
	return (
		<ul className={classes.join(' ')}>
			<MenuItems items={items} depth={depth} />
		</ul>
	);
};

Menu.defaultProps = {
	className: 'menu-container',
	depth: 0,
};

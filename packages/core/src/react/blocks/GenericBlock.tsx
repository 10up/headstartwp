import { Element } from 'html-react-parser';
import { FC } from 'react';
import { getAttributes } from '../../dom';
import { BlockProps } from '../components';

export interface GenericBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: FC<GenericComponentProps>;
}

export type GenericComponentProps = {
	className: string;
	attribs: Element['attribs'];
};

export const GenericBlock = ({
	domNode,
	children,
	className,
	component: Component,
}: GenericBlockProps) => {
	if (!domNode) {
		return null;
	}

	const attributes = getAttributes(domNode.attribs);

	return (
		<Component
			className={[attributes.className, className || ''].join(' ')}
			attribs={attributes}
		>
			{children}
		</Component>
	);
};

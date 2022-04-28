import { cx } from '@emotion/css';
import { Element } from 'html-react-parser';
import { PropsWithChildren, ReactElement } from 'react';
import { getAttributes } from '../../dom';
import { BlockProps } from '../components';

export interface ButtonBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component?: ReactElement;
}

export type ButtonProps = PropsWithChildren<{ className: string; attribs: Element['attribs'] }>;

export const Button = ({ className, children }: ButtonProps) => {
	return <div className={className}>{children}</div>;
};

export const ButtonBlock = ({ domNode, children, className, component }: ButtonBlockProps) => {
	if (!domNode) {
		return null;
	}

	const attributes = getAttributes(domNode.attribs);
	const buttonClasses = attributes.className;

	const Component = typeof component === 'function' ? component : Button;

	return (
		<Component className={cx(buttonClasses, className)} attribs={attributes}>
			{children}
		</Component>
	);
};

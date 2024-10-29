import { FC } from 'react';
import { Link as LinkBlockComponent } from '@10up/block-components';
import { useBlockProps } from '@wordpress/block-editor';
import { LinkPrimitiveValue, LinkProps } from '#shared/types.js';
import { useBlockPrimitiveProps } from './block.js';

const Link: FC<LinkProps> = ({
	name,
	value,
	className,
	placeholder = 'Enter Link Text here...',
}) => {
	const blockProps = useBlockProps();
	const { attributes, setAttributes } = useBlockPrimitiveProps();

	const attribute: LinkPrimitiveValue = attributes[name] ?? value ?? {};
	const { url, opensInNewTab, title } = attribute;

	const defaultOnPrimitiveChange = (_name, _value: LinkPrimitiveValue, _setAttributes) =>
		_setAttributes({ [_name]: _value });

	const _onPrimitiveChange = defaultOnPrimitiveChange;

	return (
		<div {...blockProps}>
			<LinkBlockComponent
				value={title}
				url={url}
				opensInNewTab={opensInNewTab}
				onTextChange={(text) =>
					_onPrimitiveChange(name, { ...attribute, text }, setAttributes)
				}
				onLinkChange={(link) =>
					_onPrimitiveChange(name, { ...attribute, ...link }, setAttributes)
				}
				onLinkRemove={() => {
					_onPrimitiveChange(
						name,
						{ url: '', text: '', title: '', opensInNewTab: false },
						setAttributes,
					);
				}}
				className={className}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Link;

import { FC } from 'react';
import { Link as LinkBlockComponent } from '@10up/block-components';
import { useBlockProps } from '@wordpress/block-editor';
import { LinkPrimitiveValue, LinkProps } from '#shared/types.js';
import { useBlockPrimitiveProps } from './hooks/useBlockPrimitiveProps.js';

export const Link: FC<LinkProps> = ({
	name,
	value: _value,
	className,
	placeholder = 'Enter Link Text here...',
}) => {
	const blockProps = useBlockProps();
	const defaultLinkValue: LinkPrimitiveValue = {
		url: '',
		opensInNewTab: false,
		title: '',
		text: '',
		type: 'link',
		kind: 'link',
	};
	const value = _value ?? defaultLinkValue;
	const { attributes, setAttributes } = useBlockPrimitiveProps();

	const attribute: LinkPrimitiveValue = attributes[name] ?? value;
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

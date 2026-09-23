import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { Placeholder, Spinner, ToolbarGroup } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import { ImagePrimitive, ImagePrimitiveValue } from '../shared/types.js';
import { useBlockPrimitiveProps } from './hooks/useBlockPrimitiveProps.js';
import { RawImage } from '../shared/raw-image.js';

/**
 * The Image Block Editor Primitive
 *
 * Expects an attribute of type {@link ImagePrimitiveValue}
 */
export const Image = (props: ImagePrimitive) => {
	const {
		name,
		onPrimitiveSelect,
		mediaURL,
		mediaId,
		title = 'Edit Media',
		value: _value,
		accept = 'image/*,video/*',
		allowedTypes = ['image'],
		...rest
	} = props;

	const defaultImageValue: ImagePrimitiveValue = {
		id: 0,
		url: '',
		alt: '',
		title: '',
		width: 0,
		height: 0,
		sizes: {},
	};
	const value = _value ?? defaultImageValue;
	const { attributes, setAttributes } = useBlockPrimitiveProps();

	const defaultOnPrimitive: ImagePrimitive['onPrimitiveSelect'] = (
		_name,
		{ id, url, alt, width, title, height, sizes },
		_setAttributes,
	) => _setAttributes({ [_name]: { id, url, alt, title, width, height, sizes } });
	const _onPrimitiveSelect = onPrimitiveSelect ?? defaultOnPrimitive;

	const onSelect: MediaReplaceFlow['onSelect'] = (value) => {
		if (attributes) {
			_onPrimitiveSelect(name, value, setAttributes, attributes);
		}
	};

	const attribute: ImagePrimitiveValue = attributes[name] ?? value;
	const { id, url } = attribute;

	const isUploading = !id && isBlobURL(url);

	return (
		<>
			<BlockControls>
				{/* @ts-expect-error */}
				<ToolbarGroup title="Options">
					<MediaReplaceFlow
						accept={accept}
						allowedTypes={allowedTypes}
						mediaId={mediaId}
						mediaUrl={mediaURL}
						name={title}
						onSelect={onSelect}
						{...rest}
					/>
				</ToolbarGroup>
			</BlockControls>

			{!id ? (
				<Placeholder className="block-editor-media-placeholder" withIllustration>
					{isUploading && (
						<Spinner
							style={{
								height: '80px',
								width: '80px',
							}}
						/>
					)}
				</Placeholder>
			) : null}

			{!isUploading && id ? <RawImage {...props} value={attribute} /> : null}
		</>
	);
};

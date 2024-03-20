// @ts-expect-error
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { Placeholder, Spinner, ToolbarGroup } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import { ImagePrimitive, ImagePrimitiveValue } from '../shared/types.js';
import { useBlockPrimitiveProps } from './block.js';

const Image = ({
	name,
	onPrimitiveSelect,
	mediaURL,
	mediaId,
	title = 'Edit Media',
	value,
	accept = 'image/*,video/*',
	allowedTypes = ['image'],
	...rest
}: ImagePrimitive) => {
	const { attributes, setAttributes } = useBlockPrimitiveProps();

	const defaultOnPrimitive: ImagePrimitive['onPrimitiveSelect'] = (
		_name,
		{ id, url, alt },
		_setAttributes,
	) => _setAttributes({ [_name]: { id, url, alt } });
	const _onPrimitiveSelect = onPrimitiveSelect ?? defaultOnPrimitive;

	const onSelect: MediaReplaceFlow['onSelect'] = (value) => {
		_onPrimitiveSelect(name, value, setAttributes, attributes);
	};

	const attribute: ImagePrimitiveValue = attributes[name] ?? value ?? {};
	const { id, url, alt } = attribute;

	const isUploading = !id && isBlobURL(url);

	return (
		<>
			{/* @ts-expect-error */}
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
			{/* TOOD: Maybe just use the front-end primitive here */}
			{!isUploading && id ? <img src={url} alt={alt ?? ''} /> : null}
		</>
	);
};

export default Image;

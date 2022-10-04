/**
 * The shape of the preview data that's stored in the preview data cookie
 */
export type PreviewData = {
	/**
	 * The id of the resource
	 */
	id: number;

	/**
	 * The post type
	 */
	postType: string;

	/**
	 * Whether the preview data is on a revision
	 */
	revision: boolean;

	/**
	 * The auth token that should be used to fetch the data
	 */
	authToken: string;

	// users might add custom preview data
	[k: string]: unknown;
};

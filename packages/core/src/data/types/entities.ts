/**
 * These types were partially generated using
 * [json-schema-to-typescript](https://www.npmjs.com/package/json-schema-to-typescript)
 * to transform the default schemas exposed by the WordPress REST API.
 *
 * Those schemas are accessible making an OPTIONS call to each endpoint.
 */

import { YoastJSON } from './yoast';

/**
 * Empty interface from which all entities inherit.
 */
export interface Entity {
	yoast_head_json?: YoastJSON | null;
	yoast_head?: string | null;
	[k: string]: unknown;
}

/**
 * Cover some cases of objects with `rendered` property.
 */
export interface Rendered {
	/**
	 * Property of the object, transformed for display.
	 */
	rendered?: string;
	[k: string]: unknown;
}

/**
 * Base interface for all post type entities.
 *
 * Interfaces that extends from this one are:
 * - {@link PostEntity}.
 * - {@link PageEntity}.
 * - {@link AttachmentEntity}.
 * - {@link RevisionEntity}.
 */
export interface PostTypeEntity extends Entity {
	/**
	 * The date the object was published, in the site's timezone.
	 */
	date: string;

	/**
	 * The date the object was published, as GMT.
	 */
	date_gmt: string;

	/**
	 * The globally unique identifier for the object.
	 */
	guid: Rendered;

	/**
	 * The date the object was last modified, in the site's timezone.
	 */
	modified: string;

	/**
	 * The date the object was last modified, as GMT.
	 */
	modified_gmt: string;

	/**
	 * Unique identifier for the object.
	 */
	id: number;

	/**
	 * URL to the object.
	 */
	link: string;

	/**
	 * An alphanumeric identifier for the object unique to its type.
	 */
	slug: string;

	/**
	 * A named status for the object.
	 */
	status: 'publish' | 'future' | 'draft' | 'pending' | 'private';

	/**
	 * Type of Post for the object.
	 */
	type: string;

	/**
	 * The title for the object.
	 */
	title: Rendered;

	author?: AuthorEntity[];

	terms?: Record<string, TermEntity[]>;

	_embedded: {
		author: AuthorEntity[];
		'wp:term': Array<TermEntity[]>;
	};

	/**
	 * Whether or not comments are open on the object.
	 */
	comment_status?: 'open' | 'closed';

	/**
	 * Whether or not the object can be pinged.
	 */
	ping_status: 'open' | 'closed';
}

/**
 * Interface for entities from the /wp/v2/posts endpoint.
 */
export interface PostEntity extends PostTypeEntity {
	/**
	 * The content for the object.
	 */
	content: Rendered;

	/**
	 * The excerpt for the object.
	 */
	excerpt: Rendered;

	/**
	 * The format for the object.
	 */
	format:
		| 'standard'
		| 'aside'
		| 'chat'
		| 'gallery'
		| 'link'
		| 'image'
		| 'quote'
		| 'status'
		| 'video'
		| 'audio';

	/**
	 * Meta fields.
	 */
	meta: Record<string, unknown>;

	/**
	 * Whether or not the object should be treated as sticky.
	 */
	sticky: boolean;

	/**
	 * The theme file to use to display the object.
	 */
	template: string;

	/**
	 * The terms assigned to the object in the category taxonomy.
	 */
	categories?: number[];

	/**
	 * The terms assigned to the object in the post_tag taxonomy.
	 */
	tags?: number[];

	/**
	 * The ID of the featured media for the object.
	 */
	featured_media: number;
}

/**
 * Interface for entities from the /wp/v2/posts/1/revisions endpoint.
 */
export interface RevisionEntity extends PostTypeEntity {
	/**
	 * The ID for the parent of the object.
	 */
	parent?: number;

	/**
	 * The content for the object.
	 */
	content?: Rendered;

	/**
	 * The excerpt for the object.
	 */
	excerpt?: Rendered;
}

/**
 * Interface for entities from the /wp/v2/pages endpoint.
 */
export interface PageEntity extends PostTypeEntity {
	/**
	 * The ID for the parent of the object.
	 */
	parent: number;

	/**
	 * The content for the object.
	 */
	content: Rendered;

	/**
	 * The excerpt for the object.
	 */
	excerpt: Rendered;

	/**
	 * The order of the object in relation to other object of its type.
	 */
	menu_order: number;

	/**
	 * Meta fields.
	 */
	meta: Record<string, unknown>;

	/**
	 * The theme file to use to display the object.
	 */
	template: string;

	/**
	 * The ID of the featured media for the object.
	 */
	featured_media: number;
}

/**
 * Interface for entities from the /wp/v2/media endpoint.
 */
export interface AttachmentEntity extends PostTypeEntity {
	/**
	 * Type of Post for the object.
	 */
	type: 'attachment';

	/**
	 * Meta fields.
	 */
	meta?: Record<string, unknown>;

	/**
	 * The theme file to use to display the object.
	 */
	template?: string;

	/**
	 * Alternative text to display when attachment is not displayed.
	 */
	alt_text: string;

	/**
	 * The attachment caption.
	 */
	caption: Rendered;

	/**
	 * The attachment description.
	 */
	description: Rendered;

	/**
	 * Attachment type.
	 */
	media_type: 'image' | 'file';

	/**
	 * The attachment MIME type.
	 */
	mime_type: string;

	/**
	 * Details about the media file, specific to its type.
	 */
	media_details?: {
		/**
		 * The width of the attachment.
		 */
		width: number;

		/**
		 * The height of the attachment.
		 */
		height: number;

		/**
		 * The file path relative to `wp-content/uploads`.
		 */
		file: string;

		/**
		 * The metadata of the attachment.
		 */
		image_meta: Record<string, unknown>;

		/**
		 * The different sizes that WordPress created for this attachment.
		 */
		sizes: Record<
			string,
			{
				/**
				 * The filename of this size.
				 */
				file: string;

				/**
				 * The width of this size.
				 */
				width: number;

				/**
				 * The height of this size.
				 */
				height: number;

				/**
				 * The mime-type of this size.
				 */
				mime_type: string;

				/**
				 * The complete URL of this size.
				 */
				source_url: string;
			}
		>;
	};

	/**
	 * The ID for the associated post of the attachment.
	 */
	post: number;

	/**
	 * URL to the original attachment file.
	 */
	source_url: string;

	/**
	 * List of the missing image sizes of the attachment.
	 */
	missing_image_sizes: string[];
}

/**
 * Interface for entities from the /wp/v2/types endpoint.
 */
export interface TypeEntity extends Entity {
	/**
	 * A human-readable description of the post type.
	 */
	description?: string;

	/**
	 * Whether or not the post type should have children.
	 */
	hierarchical?: boolean;

	/**
	 * The title for the post type.
	 */
	name?: string;

	/**
	 * An alphanumeric identifier for the post type.
	 */
	slug?: string;

	/**
	 * REST base route for the post type.
	 */
	rest_base: string;

	/**
	 * Taxonomies associated with post type.
	 */
	taxonomies: string[];
}

/**
 * Interface for entities from the /wp/v2/taxonomy endpoint.
 */
export interface TaxonomyEntity extends Entity {
	/**
	 * A human-readable description of the taxonomy.
	 */
	description: string;

	/**
	 * Whether or not the taxonomy should have children.
	 */
	hierarchical: boolean;

	/**
	 * The title for the taxonomy.
	 */
	name: string;

	/**
	 * An alphanumeric identifier for the taxonomy.
	 */
	slug: string;

	/**
	 * REST base route for the taxonomy.
	 */
	rest_base: string;

	/**
	 * Types associated with the taxonomy.
	 */
	types: string[];
}

/**
 * Interface for entities that belong to a taxonomy.
 *
 * For example:
 * - entities from the /wp/v2/categories endpoint.
 * - entities from the /wp/v2/tags endpoint.
 */
export interface TermEntity extends Entity {
	/**
	 * Unique identifier for the term.
	 */
	id: number;

	/**
	 * Number of published posts for the term.
	 */
	count: number;

	/**
	 * HTML description of the term.
	 */
	description: string;

	/**
	 * URL of the term.
	 */
	link: string;

	/**
	 * HTML title for the term.
	 */
	name: string;

	/**
	 * An alphanumeric identifier for the term unique to its type.
	 */
	slug: string;

	/**
	 * Type attribution for the term.
	 */
	taxonomy: string;

	/**
	 * The parent term ID.
	 */
	parent: number;

	/**
	 * Meta fields.
	 */
	meta: Record<string, unknown>;
}

/**
 * Map of avatar URLs by their size.
 */
export interface AvatarUrls {
	/**
	 * Avatar URL with image size of 24 pixels.
	 */
	'24'?: string;

	/**
	 * Avatar URL with image size of 48 pixels.
	 */
	'48'?: string;

	/**
	 * Avatar URL with image size of 96 pixels.
	 */
	'96'?: string;
	[k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/users endpoint.
 */
export interface AuthorEntity extends Entity {
	/**
	 * Unique identifier for the user.
	 */
	id: number;

	/**
	 * Display name for the user.
	 */
	name: string;

	/**
	 * URL of the user.
	 */
	url: string;

	/**
	 * Description of the user.
	 */
	description: string;

	/**
	 * Author URL of the user.
	 */
	link: string;

	/**
	 * An alphanumeric identifier for the user.
	 */
	slug: string;

	/**
	 * Avatar URLs for the user.
	 */
	avatar_urls?: AvatarUrls;

	/**
	 * Meta fields.
	 */
	meta: Record<string, unknown>;
}

/**
 * Interface for entities from the /wp/v2/comments endpoint.
 */
export interface CommentEntity extends Entity {
	/**
	 * Unique identifier for the object.
	 */
	id: number;

	/**
	 * The ID of the user object, if author was a user.
	 */
	author: number;

	/**
	 * Email address for the object author.
	 */
	author_email: string;

	/**
	 * Display name for the object author.
	 */
	author_name: string;

	/**
	 * URL for the object author.
	 */
	author_url: string;

	/**
	 * The content for the object.
	 */
	content: Rendered;

	/**
	 * The date the object was published, in the site's timezone.
	 */
	date: string;

	/**
	 * The date the object was published, as GMT.
	 */
	date_gmt: string;

	/**
	 * URL to the object.
	 */
	link: string;

	/**
	 * The ID for the parent of the object.
	 */
	parent: number;

	/**
	 * The ID of the associated post object.
	 */
	post: number;

	/**
	 * State of the object.
	 */
	status: string;

	/**
	 * Type of Comment for the object.
	 */
	type: 'comment';

	/**
	 * Avatar URLs for the object author.
	 */
	author_avatar_urls: AvatarUrls;

	/**
	 * Meta fields.
	 */
	meta: Record<string, unknown>;
}
/**
 * Interface for entities from the /wp/v2/search endpoint.
 */
export interface SearchEntity extends Entity {
	searchedValue: string;

	/**
	 * Type of Search for the object.
	 */
	type: string;

	/**
	 * Subtype of Search for the object.
	 */
	subtype: string | string[];
}

/**
 * Interface for search object entities from the /wp/v2/search endpoint.
 *
 * Interfaces that extends from this one are:
 * - {@link PostSearchEntity}.
 * - {@link TermSearchEntity}.
 */
export interface SearchObjectEntity extends Entity {
	/**
	 * Unique identifier for the object.
	 */
	id: number;

	/**
	 * URL to the object.
	 */
	url: string;

	/**
	 * The title for the object.
	 */
	title: string;

	/**
	 * Type of Search for the object.
	 */
	type: 'post' | 'term' | 'post-format';
}

/**
 * Interface for posts entities from the /wp/v2/search endpoint.
 */
export interface PostSearchEntity extends SearchObjectEntity {
	/**
	 * Subtype of Search for the object.
	 */
	subtype: string;

	author?: AuthorEntity[];

	terms?: Record<string, TermEntity[]>;

	_embedded: {
		author: AuthorEntity[];
		'wp:term': Array<TermEntity[]>;
		self: PostEntity[];
	};
}

/**
 * Interface for terms entities from the /wp/v2/search endpoint.
 */
export interface TermSearchEntity extends SearchObjectEntity {
	_embedded: {
		self: TermEntity[];
	};
}

export type Redirect = {
	ID: number;
	post_status: string;
	redirect_from: string;
	redirect_to: string;
	status_code: number;
	enable_regex: boolean;
};

export interface MenuItemEntity {
	// TODO: this should be a string but changing this to a string will require a new major
	// @see https://github.com/10up/headstartwp/issues/772
	ID: number;
	menu_order: number;
	post_type: string;
	post_mime_type: string;
	menu_item_parent: string;
	object_id: string;
	object: string;
	type: string;
	type_label: string;
	url: string;
	title: string;
	target: '_blank' | '_self' | '_parent' | '_top';
	attr_title: string;
	description: string;
	classes: string[];
	slug: string;
	children: MenuItemEntity[];
	order: number;
}

export interface AppEntity extends Entity {
	menus: {
		[k: string]: MenuItemEntity[];
	};
	home: {
		id?: number;
		slug?: string;
	};
	settings: {
		site_name: string;
		site_desc: string;
		site_wp_url: string;
		site_rss_url: string;
		posts_per_page: string;
		privacy_policy_url: string;
	};
	'theme.json': Record<string, any>;
}

export interface PageInfo {
	totalPages: number;
	totalItems: number;
	page: number;
}

/**
 * The QueriedObject represents the object that the current requests is subjected to.
 *
 * Querying by taxonomy and/or author will set the queried object.
 */
export type QueriedObject = {
	/**
	 * If the request is an author query, this will be populated with the author object
	 */
	author?: AuthorEntity;

	/**
	 * If the request is a term query, this will be populated with the term object
	 */
	term?: TermEntity;

	/**
	 * If the request is a search query, this will be populated with the search entity object
	 */
	search?: SearchEntity;
};

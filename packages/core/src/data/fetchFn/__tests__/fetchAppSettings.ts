import { expectTypeOf } from 'expect-type';
import { AppEntity, EndpointParams, MenuItemEntity } from '../..';
import { fetchAppSettings, flatToHierarchical } from '../fetchAppSettings';
import { setHeadstartWPConfig } from '../../../utils';

describe('fetchAppSettings', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sourceUrl: 'https://js1.10up.com',
			useWordPressPlugin: true,
		});
	});

	it('allows overriding types', async () => {
		interface MyAppEntity extends AppEntity {
			myCustomSetting: string;
		}

		interface Params extends EndpointParams {
			includeCustomSettings: boolean;
		}

		const { data } = await fetchAppSettings<MyAppEntity, Params>({
			params: {
				includeCustomSettings: true,
			},
		});

		expectTypeOf(data).toMatchTypeOf<
			| {
					myCustomSetting: string;
			  }
			| undefined
		>();
	});
});

describe('flatToHierarchical', () => {
	const menuData: Array<MenuItemEntity> = [
		{
			ID: 89,
			title: 'Privacy Policy',
			slug: 'privacy-policy',
			post_parent: '0',
			guid: 'http://localhost:8888/?p=89',
			menu_item_parent: '0',
			object_id: 'page',
			url: 'http://localhost:8888/privacy-policy/',
			target: '',
			attr_title: '',
			description: '',
			classes: [''],
			menu_order: 1,
			order: 1,
			post_type: 'nav_menu_item',
			post_mime_type: '',
			object: 'page',
			type: 'post_type',
			type_label: 'Page',
			children: [],
		},
		{
			ID: 90,
			title: 'Sample Page 9',
			slug: '',
			post_parent: '89',
			guid: 'http://localhost:8888/?p=90',
			menu_item_parent: '89',
			object_id: 'page',
			url: 'http://localhost:8888/',
			target: '',
			attr_title: '',
			description: '',
			classes: [''],
			menu_order: 2,
			order: 2,
			post_type: 'nav_menu_item',
			post_mime_type: '',
			object: 'page',
			type: 'post_type',
			type_label: 'Page',
			children: [],
		},
		{
			ID: 91,
			title: 'Ut quae sed exercitationem 8',
			slug: 'ut-quae-sed-exercitationem',
			post_parent: '90',
			guid: 'http://localhost:8888/?p=91',
			menu_item_parent: '90',
			object_id: 'post',
			url: 'http://localhost:8888/ut-quae-sed-exercitationem/',
			target: '',
			attr_title: '',
			description: '',
			classes: [''],
			menu_order: 3,
			order: 3,
			post_type: 'nav_menu_item',
			post_mime_type: '',
			object: 'post',
			type: 'post_type',
			type_label: 'Post',
			children: [],
		},
		{
			ID: 92,
			title: 'Dolor praesentium nihil quis 2',
			slug: 'dolor-praesentium-nihil-quis',
			post_parent: '0',
			guid: 'http://localhost:8888/?p=92',
			menu_item_parent: '0',
			object_id: 'post',
			url: 'http://localhost:8888/dolor-praesentium-nihil-quis/',
			target: '',
			attr_title: '',
			description: '',
			classes: [''],
			menu_order: 4,
			order: 4,
			post_type: 'nav_menu_item',
			post_mime_type: '',
			object: 'post',
			type: 'post_type',
			type_label: 'Post',
			children: [],
		},
	];

	it('converts flat menu data to hierarchical', () => {
		expect(flatToHierarchical(menuData)).toMatchObject([
			{
				ID: 89,
				title: 'Privacy Policy',
				slug: 'privacy-policy',
				post_parent: '0',
				guid: 'http://localhost:8888/?p=89',
				menu_item_parent: '0',
				object_id: 'page',
				url: 'http://localhost:8888/privacy-policy/',
				target: '',
				attr_title: '',
				description: '',
				classes: [''],
				post_type: 'nav_menu_item',
				post_mime_type: '',
				object: 'page',
				type: 'post_type',
				type_label: 'Page',
				children: [
					{
						ID: 90,
						title: 'Sample Page 9',
						slug: '',
						post_parent: '89',
						guid: 'http://localhost:8888/?p=90',
						menu_item_parent: '89',
						object_id: 'page',
						url: 'http://localhost:8888/',
						target: '',
						attr_title: '',
						description: '',
						classes: [''],
						post_type: 'nav_menu_item',
						post_mime_type: '',
						object: 'page',
						type: 'post_type',
						type_label: 'Page',
						children: [
							{
								ID: 91,
								title: 'Ut quae sed exercitationem 8',
								slug: 'ut-quae-sed-exercitationem',
								post_parent: '90',
								guid: 'http://localhost:8888/?p=91',
								menu_item_parent: '90',
								object_id: 'post',
								url: 'http://localhost:8888/ut-quae-sed-exercitationem/',
								target: '',
								attr_title: '',
								description: '',
								classes: [''],
								post_type: 'nav_menu_item',
								post_mime_type: '',
								object: 'post',
								type: 'post_type',
								type_label: 'Post',
								children: [],
							},
						],
					},
				],
			},
			{
				ID: 92,
				title: 'Dolor praesentium nihil quis 2',
				slug: 'dolor-praesentium-nihil-quis',
				post_parent: '0',
				guid: 'http://localhost:8888/?p=92',
				menu_item_parent: '0',
				object_id: 'post',
				url: 'http://localhost:8888/dolor-praesentium-nihil-quis/',
				target: '',
				attr_title: '',
				description: '',
				classes: [''],
				post_type: 'nav_menu_item',
				post_mime_type: '',
				object: 'post',
				type: 'post_type',
				type_label: 'Post',
				children: [],
			},
		]);
	});
});

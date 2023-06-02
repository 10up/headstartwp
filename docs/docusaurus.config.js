// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
/* eslint-disable import/no-unresolved */

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: '10up - HeadstartWP',
	tagline: '',
	url: 'https://headless.10up.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: '10up', // Usually your GitHub org/user name.
	projectName: 'headless-framework', // Usually your repo name.
	trailingSlash: true,
	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: false,
				blog: false,
				gtag: {
					trackingID: 'G-WF1Z7JSCXS',
					anonymizeIP: true,
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	plugins: [
		[
			'docusaurus-plugin-typedoc',
			{
				name: 'HeadstartWP',
				out: '.',
				entryPoints: ['../packages/core', '../packages/next'],
				entryPointStrategy: 'packages',
				categorizeByGroup: false,
				excludeInternal: true,
				readme: 'none',
				sidebar: {
					categoryLabel: 'API reference',
					collapsed: false,
					position: 0,
					fullNames: true,
				},
			},
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				path: 'documentation',
				routeBasePath: '/learn',
				sidebarPath: require.resolve('./sidebars.js'),
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/headless/tree/trunk/site',
				sidebarCollapsed: false,
			},
		],
		/* [
			'@docusaurus/plugin-content-docs',
			{
				id: 'training',
				path: 'training',
				routeBasePath: 'training',
				sidebarPath: require.resolve('./sidebars.js'),
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/headless/tree/trunk/site',
				sidebarCollapsed: false,
			},
		], */
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'docs',
				routeBasePath: '/api',
				sidebarPath: require.resolve('./sidebars.js'),
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/headless/tree/trunk/site',
				sidebarCollapsed: false,
			},
		],
		[
			require.resolve('@easyops-cn/docusaurus-search-local'),
			{
				indexDocs: true,
				docsRouteBasePath: ['reference', 'docs'],
				docsDir: ['default', 'docs'],
				hashed: true,
			},
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			colorMode: {
				defaultMode: 'light',
				disableSwitch: true,
			},
			navbar: {
				title: 'HeadstartWP',
				logo: {
					src: 'img/10up-logo-full.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'Docs',
					},
					/* {
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'Tutorial',
						docsPluginId: 'training',
					}, */
					{
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'API Reference',
						docsPluginId: 'docs',
					},
				],
			},
			announcementBar: {
				id: 'support_us',
				content:
					'Have any questions or suggestions? Just open a discussion in <a target="_blank" rel="noopener noreferrer" href="https://github.com/10up/headless/discussions/new">this GitHub Repository</a>',
				backgroundColor: '#fafbfc',
				textColor: '#091E42',
				isCloseable: false,
			},
			footer: {
				style: 'light',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Documentation',
								to: '/learn',
							},
							/* {
								label: 'Tutorial',
								to: '/training',
							}, */
							{
								label: 'API Reference',
								to: '/api',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'GitHub Discussions',
								href: 'https://github.com/10up/headless/discussions/',
							},
						],
					},
					/* {
						title: 'Resources',
						items: [
							{
								label: 'Block Components',
								href: 'https://github.com/10up/block-components',
							},
							{
								label: 'Block Examples (internal)',
								href: 'https://github.com/10up/block-examples',
							},
							{
								label: 'WP Scaffold',
								href: 'https://github.com/10up/wp-scaffold',
							},
						],
					}, */
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
				additionalLanguages: ['php', 'bash'],
			},
		}),
};

module.exports = config;

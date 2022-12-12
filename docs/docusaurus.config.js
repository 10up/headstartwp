// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: '10up - Headless Framework',
	tagline: '',
	url: 'https://headless.10up.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: '10up', // Usually your GitHub org/user name.
	projectName: 'headless-framework', // Usually your repo name.

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
			'@docusaurus/plugin-content-docs',
			{
				id: 'docs',
				path: 'docs',
				routeBasePath: 'docs',
				sidebarPath: require.resolve('./sidebars.js'),
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/gutenberg-best-practices/tree/main/',
				sidebarCollapsed: false,
			},
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'training',
				path: 'training',
				routeBasePath: 'training',
				sidebarPath: require.resolve('./sidebars.js'),
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/gutenberg-best-practices/tree/main/',
				sidebarCollapsed: false,
			},
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				path: 'reference',
				routeBasePath: 'reference',
				sidebarPath: require.resolve('./sidebars.js'),
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/gutenberg-best-practices/tree/main/',
				sidebarCollapsed: false,
			},
		],
		[
			require.resolve('@easyops-cn/docusaurus-search-local'),
			{
				indexDocs: true,
				docsRouteBasePath: ['reference', 'docs', 'training'],
				docsDir: ['reference', 'docs', 'training'],
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
				title: 'Headless Framework',
				logo: {
					src: 'img/10up-logo-full.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'Reference',
					},
					{
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'Training',
						docsPluginId: 'training',
					},
					{
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'Documentation',
						docsPluginId: 'docs',
					},
				],
			},
			announcementBar: {
				id: 'support_us',
				content:
					'Have any questions or suggestions? Just open a discussion in <a target="_blank" rel="noopener noreferrer" href="https://github.com/10up/gutenberg-best-practices/discussions/new">this GitHub Repository</a>',
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
								label: 'Reference',
								to: '/reference',
							},
							{
								label: 'Training',
								to: '/training',
							},
							{
								label: 'Documentation',
								to: '/docs',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Slack Channel (internal)',
								href: 'https://10up.slack.com/archives/C8Z3WMN1K',
							},
							{
								label: 'GitHub Discussions',
								href: 'https://github.com/10up/gutenberg-best-practices/discussions/',
							},
						],
					},
					{
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
					},
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

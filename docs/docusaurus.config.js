// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
/* eslint-disable import/no-unresolved */

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'HeadstartWP Docs - Next.js Framework for WordPress',
	tagline: '',
	url: 'https://headstartwp.10up.com',
	baseUrl: '/docs',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: '10up', // Usually your GitHub org/user name.
	projectName: 'headless-framework', // Usually your repo name.
	trailingSlash: true,
	markdown: {
		mermaid: true,
		format: 'detect',
		mdx1Compat: {
			admonitions: true,
			comments: true,
			headingIds: true,
		},
	},
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
					customCss: './src/css/custom.css',
				},
			}),
		],
	],

	plugins: [
		[
			'docusaurus-plugin-typedoc',
			{
				name: 'HeadstartWP',
				out: './docs',
				entryPoints: ['../packages/core', '../packages/next'],
				entryPointStrategy: 'packages',
				packageOptions: {
					entryPoints: ['src/docs-entry-point.ts'],
				},
				categorizeByGroup: false,
				excludeInternal: true,
				readme: 'none',
			},
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				path: 'documentation',
				routeBasePath: '/learn',
				sidebarPath: './sidebars.js',
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/headstartwp/tree/trunk/docs',
				sidebarCollapsed: false,
				versions: {
					current: {
						label: 'App Router (1.5+)',
						path: '/',
						banner: 'none',
					},
					'pages-router': {
						label: 'Pages Router',
						path: 'pages-router',
					},
				},
			},
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'docs',
				routeBasePath: '/api',
				sidebarPath: './sidebars.js',
				showLastUpdateTime: true,
				showLastUpdateAuthor: true,
				editUrl: 'https://github.com/10up/headstartwp/tree/trunk/docs',
				sidebarCollapsed: false,
			},
		],
		[
			'@easyops-cn/docusaurus-search-local',
			{
				indexDocs: true,
				docsRouteBasePath: ['learn', 'api'],
				docsDir: ['documentation', 'docs'],
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
					src: 'img/headstart-logo.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'Docs',
					},
					{
						type: 'doc',
						docId: 'index',
						position: 'right',
						label: 'API Reference',
						docsPluginId: 'docs',
					},
					{
						type: 'docsVersionDropdown',
						position: 'left',
						dropdownActiveClassDisabled: true,
					},
				],
			},
			announcementBar: {
				id: 'support_us',
				content:
					'Have any questions or suggestions? Just open a discussion in <a target="_blank" rel="noopener noreferrer" href="https://github.com/10up/headstartwp/discussions/new">this GitHub Repository</a>',
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
								href: 'https://github.com/10up/headstartwp/discussions/',
							},
						],
					},
				],
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
				additionalLanguages: ['php', 'bash'],
			},
		}),
};

export default config;

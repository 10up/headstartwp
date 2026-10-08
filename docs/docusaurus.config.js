// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
/* eslint-disable import/no-unresolved */

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'HeadstartWP Docs - Next.js Framework for Headless WordPress',
	tagline: '',
	url: 'https://headstartwp.fueled.com',
	baseUrl: '/docs',
	// Links into the generated /api section are unavoidably broken when
	// SKIP_TYPEDOC skips generation — downgrade so local builds still pass.
	onBrokenLinks: process.env.SKIP_TYPEDOC ? 'warn' : 'throw',
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
				// Same Google tag as the main site (Site Kit on
				// headstartwp.fueled.com) — one GA4 property covers the full
				// site→docs journey. Replaces the legacy 10up GTM container.
				// Production-only: in dev the gtag script never loads, so the
				// plugin's route-change handler would throw on every navigation.
				...(process.env.NODE_ENV === 'production'
					? {
							gtag: {
								trackingID: 'GT-WRDG786',
								anonymizeIP: true,
							},
					  }
					: {}),
				theme: {
					customCss: './src/css/custom.css',
				},
			}),
		],
	],

	plugins: [
		// SKIP_TYPEDOC=1 skips API-reference generation for faster local
		// theme/content work (it needs the monorepo packages installed and
		// built). CI always runs it. Local builds still get working search,
		// minus API-reference entries (see the search plugin config below).
		...(process.env.SKIP_TYPEDOC
			? []
			: [
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
			  ]),
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
				// Search must only reference contexts that emit an index: with
				// SKIP_TYPEDOC there is no /api content, and a missing context
				// index leaves the search loader hanging forever.
				docsRouteBasePath: process.env.SKIP_TYPEDOC ? ['learn'] : ['learn', 'api'],
				docsDir: process.env.SKIP_TYPEDOC ? ['documentation'] : ['documentation', 'docs'],
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
						label: 'Developer Guide',
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
					{
						href: 'https://headstartwp.fueled.com/',
						label: 'About HeadstartWP',
						position: 'right',
						className: 'navbar-site-cta',
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
						title: 'Docs & Community',
						items: [
							{
								label: 'Developer Guide',
								to: '/learn',
							},
							{
								label: 'API Reference',
								to: '/api',
							},
							{
								label: 'GitHub Discussions',
								href: 'https://github.com/10up/headstartwp/discussions/',
							},
						],
					},
					{
						title: 'HeadstartWP',
						items: [
							{
								label: 'Main site',
								href: 'https://headstartwp.fueled.com/',
							},
							{
								label: 'News & Updates',
								href: 'https://headstartwp.fueled.com/news/',
							},
							{
								label: 'Privacy Policy',
								href: 'https://headstartwp.fueled.com/privacy-policy/',
							},
						],
					},
					{
						title: 'Fueled (formerly 10up)',
						items: [
							{
								label: 'WordPress',
								href: 'https://fueled.com/wordpress/?utm_source=referral&utm_medium=Website%20Referral&utm_campaign=headstartwp.fueled.com&utm_content=docs-footer',
							},
							{
								label: 'Hire us',
								href: 'https://fueled.com/contact/?utm_source=referral&utm_medium=Website%20Referral&utm_campaign=headstartwp.fueled.com&utm_content=docs-footer-hire',
							},
							{
								label: 'Careers',
								href: 'https://fueled.com/careers/?utm_source=referral&utm_medium=Website%20Referral&utm_campaign=headstartwp.fueled.com&utm_content=docs-footer-careers',
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

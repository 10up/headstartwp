---
sidebar_label: TypeScript
---

# TypeScript

HeadstartWP offer first-class support for TypeScript. In this guide we document how to leverage TypeScript with HeadstartWP and the Next.js pages router. We also recommend reviewing the official Next.js [docs for TypeScript](https://nextjs.org/docs/pages/building-your-application/configuring/typescript) as using default [HeadstartWP project](https://github.com/10up/headstartwp/tree/develop/projects/wp-nextjs) as a reference for building with TypeScript.

## getStaticProps, getServerSideProps and page props

The recommended way to type `getStaticProps` and `getServerSideProps` is by using the `satisfies` operator. Ensure you have `typescript` >= 4.9 before using `satisfies`.

HeadstartWP exports two types that can be used for this purpose `HeadlessGetStaticProps` and `HeadlessGetServerSideProps`.

```ts 
import type { HeadlessGetStaticProps } from '@headstartwp/next';

export const getStaticProps = (async (context) => {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePost.fetcher(), context, { params: singleParams }),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context) },
		]);

		return addHookData(settledPromises, { revalidate: 5 * 60 });
	} catch (e) {
		return handleError(e, context);
	}
}) satisfies HeadlessGetStaticProps;
```

By using HeadstartWP types you will get the `context` object properly typed for HeadstartWP, for instance the `context.previewData` will be typed with HeadstartWP preview data type.

If you are sending additional props to your page component we recommend using `InferGetStaticPropsType` from Next.js.

```ts
// `homepageSlug` will correctly be typed to `string`
const Homepage = ({ homePageSlug }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const params = { ...indexParams, slug: homePageSlug };

	return (
		<>
			<PageContent params={params} />
		</>
	);
};

export default Homepage;


export const getStaticProps = (async (context) => {
	const hookData = [];
	let slug = '';
	try {
		const appSettings = await fetchHookData(useAppSettings.fetcher(), context);

		/**
		 * The static front-page can be set in the WP admin. The default one will be 'front-page'
		 */
		slug = appSettings.data.result?.home?.slug ?? 'front-page';

		hookData.push(appSettings);
	} catch (e) {
		if (e.name === 'EndpointError') {
			slug = 'front-page';
		}
	}

	try {
		const usePost = await fetchHookData(usePost.fetcher(), context, {
					params: {
						...indexParams,
						slug,
					},
		});

		hookData.push(...fetchBatch);

		return addHookData(hookData, {
            // TypeScript can cleverly infer the `props` type here
			props: { homePageSlug: slug },
			revalidate: 5 * 60,
		});
	} catch (e) {
		return handleError(e, context);
	}
}) satisfies HeadlessGetStaticProps;
```

Note that `addHookData` also accepts a generic type if you need to provider a complex type def for you own props.

```ts
return addHookData<MyCustomPropsType>(hookData, {
    props: { homePageSlug: slug, complexDataType },
    revalidate: 5 * 60,
});
```

### Extending Framework Hooks

Certain hooks in the framework can accept Generic type parameters. This can used to provide a better developer experience during implementation as you will have clarity on the return type. It may often be required to extend WordPress REST API endpoints to return additional data to align with project requirements. As projects grow, you may need to implement this at hook level to return a specific subset of data as opposed to at route level within `getServerSideProps` or `getStaticProps`. An example is provided below. 

```ts title="useExampleHook.ts"
interface CustomAppSettings extends AppEntity {
	settings: AppEntity['settings'] & {
		custom_settings: {
			banner_text?: string;
		};
	};
}
const useExampleHook = () => {
	const { data, error, loading } = useAppSettings<CustomAppSettings>();
	...
}
```

## Recommended TS Config

This is the recommended TS Config for working with HeadstartWP and TypeScript

```json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "strictNullChecks": true,
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## Global Types

We recommend using a `src/global.d.ts` file when you need to add/extend types to the global scope. An example would be extending the `window` global for typing third party scripts (Ads, GA etc).

Make sure that `src/global.d.ts` is added to your `tsconfig.json` include array.

```ts title="src/global.d.t"
interface Window {
  // add new types to the Window global
}
```

## Running the typecheck

By default Next.js will run `tsc` to validate your types. If type checking fails your build will fail. Therefore we recommend running `tsc --noEmit` before commiting and/or on your CI prior to merging PRs.

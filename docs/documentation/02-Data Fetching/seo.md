---
sidebar_position: 9
sidebar_label: SEO & Metadata
---

# SEO & Metadata

HeadstartWP provides seamless SEO support for Next.js App Router through the native [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata). All query functions automatically return SEO data that's compatible with Next.js metadata.

## Basic Usage

### generateMetadata Function

```tsx title="app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo } = await queryPost({
    routeParams: await params,
    params: {
      postType: ['post', 'page'],
    },
  });
  
  return seo.metadata;
}

export default async function DynamicPage({ params }) {
  const { data, seo } = await queryPost({
    routeParams: await params,
    params: {
      postType: ['post', 'page'],
    },
  });
  
  return (
    <article>
      <h1>{data.post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.content.rendered }} />
      
      {/* JSON-LD Schema */}
      {seo.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.schema),
          }}
        />
      )}
    </article>
  );
}
```

### Archive Pages

```tsx title="app/blog/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog Posts',
    description: 'Latest blog posts and articles',
    openGraph: {
      title: 'Blog Posts',
      description: 'Latest blog posts and articles',
      type: 'website',
    },
  };
}

export default async function BlogPage({ params }) {
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      per_page: 10,
    },
  });
  
  return (
    <main>
      <h1>Blog Posts</h1>
      {/* Render posts */}
    </main>
  );
}
```

## Available Metadata

The `seo.metadata` object includes all standard Next.js metadata fields:

### Basic Metadata

```typescript
interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  robots?: string;
  canonical?: string;
}
```

### Open Graph

```typescript
interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
  locale: string;
  type: 'website' | 'article';
}
```

### Twitter Cards

```typescript
interface TwitterData {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  images: string[];
  creator?: string;
  site?: string;
}
```

## Advanced Examples

### Custom Metadata Merging

```tsx title="app/blog/[slug]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo, data } = await queryPost({
    routeParams: await params,
    params: {
      postType: 'post',
    },
  });
  
  // Merge HeadstartWP SEO with custom metadata
  return {
    ...seo.metadata,
    // Override or add custom fields
    keywords: [
      ...(seo.metadata.keywords || []),
      'custom-keyword',
      'blog',
    ],
    authors: [
      {
        name: data.post.author?.name,
        url: data.post.author?.link,
      },
    ],
    category: data.post.terms?.category?.[0]?.name,
  };
}
```

### Dynamic Metadata for Archives

```tsx title="app/category/[slug]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      category: resolvedParams.slug,
      per_page: 1, // Just to get category info
    },
  });
  
  const category = data.queriedObject?.term;
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category was not found',
    };
  }
  
  return {
    title: `${category.name} - Blog Category`,
    description: category.description || `Posts in the ${category.name} category`,
    openGraph: {
      title: category.name,
      description: category.description || `Posts in the ${category.name} category`,
      type: 'website',
    },
    alternates: {
      canonical: category.link,
    },
  };
}
```

## JSON-LD Schema

HeadstartWP automatically generates structured data for your content:

### Article Schema

```tsx title="app/[...path]/page.tsx"
import { JSONLD } from '@headstartwp/next/app';

export default async function PostPage({ params }) {
  const { data, seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
  });
  
  return (
    <article>
      <h1>{data.post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.content.rendered }} />
      
      {/* Render JSON-LD using the helper component */}
      <JSONLD schema={seo.schema} />
    </article>
  );
}
```

### Custom Schema

```tsx
export default async function PostPage({ params }) {
  const { data, seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
  });
  
  // Extend or customize the schema
  const customSchema = {
    ...seo.schema,
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    // Add custom properties
    wordCount: data.post.content.rendered.split(' ').length,
    readingTime: `${Math.ceil(data.post.content.rendered.split(' ').length / 200)} min read`,
  };
  
  return (
    <article>
      <h1>{data.post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.content.rendered }} />
      
      <JSONLD schema={customSchema} />
    </article>
  );
}
```

## Multi-language SEO

### Language Alternates

```tsx title="app/[...path]/page.tsx"
export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo, data } = await queryPost({
    routeParams: await params,
    params: { postType: ['post', 'page'] },
  });
  
  return {
    ...seo.metadata,
    alternates: {
      canonical: data.post.link,
      languages: {
        'en-US': '/en' + data.post.link,
        'es-ES': '/es' + data.post.link,
        'fr-FR': '/fr' + data.post.link,
      },
    },
  };
}
```

## Performance Optimization

### Metadata Caching

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
    options: {
      next: {
        revalidate: 3600, // Cache metadata for 1 hour
        tags: ['seo', 'metadata'],
      },
    },
  });
  
  return seo.metadata;
}
```

### Streaming Metadata

For complex pages, you can stream metadata:

```tsx title="app/complex-page/page.tsx"
import { Suspense } from 'react';

export async function generateMetadata({ params }): Promise<Metadata> {
  // Basic metadata first
  return {
    title: 'Loading...',
    description: 'Complex page loading',
  };
}

async function DynamicMetadata({ params }) {
  const { seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'page' },
  });
  
  // This would update metadata dynamically (concept)
  return null;
}

export default async function ComplexPage({ params }) {
  return (
    <main>
      <Suspense fallback={<div>Loading metadata...</div>}>
        <DynamicMetadata params={params} />
      </Suspense>
      
      <h1>Complex Page</h1>
      {/* Page content */}
    </main>
  );
}
```

## WordPress SEO Plugin Integration

HeadstartWP automatically integrates with popular WordPress SEO plugins:

### Yoast SEO

```tsx
// Yoast metadata is automatically included in seo.metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
  });
  
  // Includes Yoast title, description, focus keyword, etc.
  return seo.metadata;
}
```

### RankMath

```tsx
// RankMath data is also automatically parsed
export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
  });
  
  return {
    ...seo.metadata,
    // RankMath schema is included in seo.schema
  };
}
```

## Best Practices

### 1. Always Use generateMetadata

```tsx
// ✅ Good - Uses generateMetadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
  });
  
  return seo.metadata;
}

// ❌ Avoid - Inline metadata in component
export default async function PostPage({ params }) {
  // Don't do this for dynamic content
  return (
    <head>
      <title>Hardcoded Title</title>
    </head>
  );
}
```

### 2. Handle Missing Data

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const { seo } = await queryPost({
      routeParams: await params,
      params: { postType: 'post' },
    });
    
    return seo.metadata;
  } catch (error) {
    // Fallback metadata
    return {
      title: 'Content Not Found',
      description: 'The requested content was not found',
      robots: 'noindex,nofollow',
    };
  }
}
```

### 3. Optimize Images

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo, data } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
  });
  
  return {
    ...seo.metadata,
    openGraph: {
      ...seo.metadata.openGraph,
      images: seo.metadata.openGraph?.images?.map(img => ({
        ...img,
        // Ensure proper alt text
        alt: img.alt || data.post.title.rendered,
      })),
    },
  };
}
``` 
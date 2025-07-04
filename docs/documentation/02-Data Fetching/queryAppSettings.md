---
sidebar_position: 5
sidebar_label: queryAppSettings
slug: /data-fetching/query-app-settings
---

# queryAppSettings

The `queryAppSettings` function is used to fetch WordPress application settings, menus, and theme configuration in Next.js App Router Server Components. This is typically used in layouts to get global site data like navigation menus, theme settings, and other application-wide configuration.

## Usage

### Basic Layout Setup

The most common usage is in your root layout to fetch navigation menus and theme settings:

```tsx title="app/layout.tsx"
import { Inter } from 'next/font/google';
import {
  Link,
  PreviewIndicator,
  queryAppSettings,
  HeadstartWPApp,
  BlockLibraryStyles,
} from '@headstartwp/next/app';
import type { SettingsContextProps } from '@headstartwp/core/react';
import { Menu } from '@headstartwp/core/react';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menu, data, config } = await queryAppSettings({ menu: 'primary' });

  const settings: SettingsContextProps = {
    ...config,
    linkComponent: Link,
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <BlockLibraryStyles />
        <HeadstartWPApp settings={settings} themeJSON={data['theme.json']}>
          {menu ? <Menu items={menu} /> : null}
          {children}
          <PreviewIndicator />
        </HeadstartWPApp>
      </body>
    </html>
  );
}
```

### In Server Components

You can also use `queryAppSettings` in other Server Components to access theme settings:

```tsx title="components/Blocks.tsx"
import { BlocksRenderer } from '@headstartwp/core/react';
import { queryAppSettings } from '@headstartwp/next/app';

export default async function Blocks({ html, settings, styles }) {
  const { data } = await queryAppSettings();

  return (
    <BlocksRenderer
      html={html}
      settings={settings}
      blockContext={{ themeJSON: data['theme.json'].settings }}
      blockStyles={styles}
    >
      {/* Your block components */}
    </BlocksRenderer>
  );
}
```

## Parameters

### Function Signature

```typescript
queryAppSettings({
  menu?: string,
  params?,
  options?
}): Promise<{
  data: AppSettingsEntity,
  menu?: MenuEntity[],
  config: HeadlessConfig
}>
```

### menu

Specify which WordPress menu to fetch alongside the app settings:

```tsx
const { menu, data } = await queryAppSettings({ menu: 'primary' });
```

### params

Additional query parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `menu` | `string` | Menu slug or location to fetch |

### options

Next.js App Router specific options:

```tsx
const { data } = await queryAppSettings({
  menu: 'primary',
  options: {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['settings', 'menu'], // Cache tags
    },
    cache: 'force-cache',
  },
});
```

## Return Value

### data

The app settings object containing:

- `name` - Site title
- `description` - Site tagline
- `url` - Site URL
- `home` - Homepage URL
- `gmt_offset` - GMT offset
- `timezone_string` - Timezone
- `theme.json` - Theme configuration and styles
- Additional WordPress settings

### menu

When a menu is requested, contains an array of menu items:

```tsx
const { menu } = await queryAppSettings({ menu: 'primary' });

// menu contains:
// [
//   {
//     id: 1,
//     title: 'Home',
//     url: '/',
//     menu_order: 1,
//     children: [...] // Sub-menu items
//   },
//   // ... more items
// ]
```

### config

The HeadlessConfig object used for the request.

## Advanced Examples

### Multiple Menu Locations

```tsx title="app/layout.tsx"
export default async function RootLayout({ children }) {
  const [primary, footer] = await Promise.all([
    queryAppSettings({ menu: 'primary' }),
    queryAppSettings({ menu: 'footer' }),
  ]);

  return (
    <html lang="en">
      <body>
        <HeadstartWPApp settings={primary.config}>
          <header>
            {primary.menu && <Menu items={primary.menu} />}
          </header>
          
          <main>{children}</main>
          
          <footer>
            {footer.menu && <Menu items={footer.menu} />}
          </footer>
        </HeadstartWPApp>
      </body>
    </html>
  );
}
```

### Theme Configuration

```tsx title="components/ThemeProvider.tsx"
import { queryAppSettings } from '@headstartwp/next/app';

export default async function ThemeProvider({ children }) {
  const { data } = await queryAppSettings();
  
  const themeSettings = data['theme.json']?.settings || {};
  
  return (
    <div 
      style={{
        '--primary-color': themeSettings.color?.palette?.[0]?.color,
        '--font-family': themeSettings.typography?.fontFamily,
      }}
    >
      {children}
    </div>
  );
}
```

### Conditional Menu Rendering

```tsx title="components/Navigation.tsx"
import { queryAppSettings } from '@headstartwp/next/app';
import { Menu } from '@headstartwp/core/react';

export default async function Navigation() {
  const { menu, data } = await queryAppSettings({ menu: 'primary' });
  
  if (!menu || menu.length === 0) {
    return (
      <nav>
        <p>No navigation menu configured</p>
      </nav>
    );
  }

  return (
    <nav>
      <h1>{data.name}</h1>
      <Menu items={menu} />
    </nav>
  );
}
```

## Caching and Revalidation

### Static Generation

App settings are typically cached for long periods since they don't change frequently:

```tsx
const { data } = await queryAppSettings({
  menu: 'primary',
  options: {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['app-settings'],
    },
  },
});
```

### On-Demand Revalidation

```tsx
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('app-settings');
  return Response.json({ revalidated: true });
}
```

## Notes

- This function is designed for use in Server Components and layouts
- App settings are typically cached for longer periods than other content
- The `theme.json` data is used by HeadstartWP's block system for styling
- Menu data is automatically structured in a hierarchical format for sub-menus


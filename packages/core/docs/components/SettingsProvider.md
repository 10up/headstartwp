# SettingsProvider

The `SettingsProvider` component houses the core framework settings. It exposes the settings to children components through the Context API. Settings can be accessed via `useSettings`.

## Usage

### SettingsProvider

```javascript
const App = () => {
	return (
		<SettingsProvider settings={mergedSettings}>
			{children}
		</SettingsProvider>
	);
}
```

### useSettings

```javascript
export const MyComponent = () => {
	const settings = useSettings();
	// do something with the settings
};
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `settings` | [`SettingsContextProps`](../../src//provider/types.ts#L3)    | `{}`   | The initial settings object. By default it will include settings exposed in a global `__10up__HEADLESS_CONFIG` variable. This allow framework-sepcific integration to allow users to specify the settings in a settings file such as `headless.config.js`. See the Next.js integration for more information.        

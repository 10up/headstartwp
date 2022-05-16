import '@emotion/react';

import { ThemeJSON } from './src/react/provider/types';

declare module '@emotion/react' {
	export interface Theme extends ThemeJSON {}
}

import { FC, createContext } from 'react';
import { ThemeJSON } from './types';

export const ThemeJsonContext = createContext<ThemeJSON>({});

interface ProviderProps {
	data: ThemeJSON;
}

export const ThemeJsonProvider: FC<ProviderProps> = ({ data, children }) => {
	return <ThemeJsonContext.Provider value={data}>{children}</ThemeJsonContext.Provider>;
};

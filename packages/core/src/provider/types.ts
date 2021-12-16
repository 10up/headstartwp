import { HeadlessConfigType } from '../headless.config';

export type SettingsContextProps = {
	url: string;
} & HeadlessConfigType;

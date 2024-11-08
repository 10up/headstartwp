'use client';

import { useContext } from 'react';
import { SettingsContext } from './Provider';

export function useSettings() {
	return useContext(SettingsContext);
}

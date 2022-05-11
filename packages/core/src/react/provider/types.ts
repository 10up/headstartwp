import React, { ReactNode } from 'react';
import type { HeadlessConfig } from '../../types';
import type { IImageBlock } from '../blocks/ImageBlock';

export type SettingsContextProps = {
	linkComponent?: ReactNode;
	imageComponent?: React.FC<IImageBlock>;
} & HeadlessConfig;

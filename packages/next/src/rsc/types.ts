export type HeadstartWPRoute<Params extends { [k: string]: unknown } = {}> = {
	params: Promise<{ path: string[]; site?: string; lang?: string }>;
} & Params;

export type HeadstartWPLayout<Params extends { [k: string]: unknown } = {}> = {
	params: Promise<{ site?: string; lang?: string }>;
	children: React.ReactNode;
} & Params;

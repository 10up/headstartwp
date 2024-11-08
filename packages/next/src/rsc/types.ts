export type HeadstartWPRoute<Params extends { [k: string]: unknown } = {}> = {
	params: { path: string[]; site?: string; lang?: string };
} & Params;

export type HeadstartWPLayout<Params extends { [k: string]: unknown } = {}> = {
	params: { site?: string; lang?: string };
	children: React.ReactNode;
} & Params;

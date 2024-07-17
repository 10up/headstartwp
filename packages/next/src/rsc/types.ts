export type HeadstartWPRoute<Params extends { [k: string]: unknown } = {}> = {
	params: { path: string[]; site?: string };
} & Params;

export type HeadstartWPLayout<Params extends { [k: string]: unknown } = {}> = {
	params: { site?: string };
	children: React.ReactNode;
} & Params;

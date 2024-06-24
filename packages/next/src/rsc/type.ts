export type HeadstartWPRoute<Params extends { [k: string]: unknown } = {}> = {
	params: { path: string[]; site: string };
} & Params;

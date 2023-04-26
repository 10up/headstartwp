/* eslint-disable no-console */
export enum LOGTYPE {
	DEBUG,
	INFO,
	WARN,
	ERROR,
}

export const log = (type: LOGTYPE, ...args: any[]) => {
	if (process.env.NODE_ENV === 'production') {
		return;
	}

	const prefix = '🚀 HeadstartWP:';
	switch (type) {
		case LOGTYPE.DEBUG:
			console.debug(prefix, ...args);
			break;
		case LOGTYPE.INFO:
			console.info(prefix, ...args);
			break;
		case LOGTYPE.WARN:
			console.warn(prefix, ...args);
			break;
		case LOGTYPE.ERROR:
			console.error(prefix, ...args);
			break;
		default:
			console.log(prefix, ...args);
	}
};

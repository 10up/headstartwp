import { EPResponse, EPSearchParams } from './types';

export async function get(data: EPSearchParams, endpoint: string): Promise<EPResponse> {
	let endpointWithParams = `${endpoint}?`;
	if (data && Object.keys(data).length) {
		endpointWithParams += Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join('&');
	}

	const response = await fetch(endpointWithParams);
	return response.json();
}

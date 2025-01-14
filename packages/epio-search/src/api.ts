import { EPResponse, EPSearchParams } from './types';

export async function get(data: EPSearchParams, endpoint: string): Promise<EPResponse> {
	let endpointWithParams = `${endpoint}?`;
	if (data && Object.keys(data).length) {
		endpointWithParams += Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join('&');
	}

	try {
		const response = await fetch(endpointWithParams);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

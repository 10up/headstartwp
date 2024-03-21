/**
 * Creates a path from array of arguments
 *
 * @param args - Array of catch-all arguments
 *
 * @category Next.js Data Fetching Utilities
 */
export function convertToPath(args: string[] | undefined) {
	if (!args) {
		return '/';
	}

	return `/${args.filter((a) => a.length > 0).join('/')}`;
}

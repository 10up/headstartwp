import { Element } from 'html-react-parser';
import { getBlockStyle } from '../utils';

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockStyle(node: Element) {
	return getBlockStyle(node);
}

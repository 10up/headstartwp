import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from '../util';

/**
 * useLayoutEffect fails on server side so this returns useEffect on the
 * server (which will never run) and useLayoutEffect on the client.
 */
export const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

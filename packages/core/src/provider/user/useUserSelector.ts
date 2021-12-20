import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import isEqual from 'lodash.isequal';
import { UserContext } from './Provider';
import { User } from './types';

export function useUser() {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error('useSelector must be used within a UserProvider');
	}

	return context;
}

export function useUserSelector(getter: (user: User) => Partial<User>) {
	const { getUser, registerListener, unregisterListener } = useUser();
	const user = getUser();
	const [state, setState] = useState(getter(user));
	const listenerId = useMemo(() => uuidv4(), []);

	const listener = useCallback(
		(newUser: User) => {
			const newValue = getter(newUser);
			const hasChanged = !isEqual(state, newValue);

			if (hasChanged) {
				setState(newValue);
			}
		},
		[getter, state],
	);

	useEffect(() => {
		registerListener(listenerId, listener);

		return () => unregisterListener(listenerId);
	}, [registerListener, unregisterListener, listenerId, listener]);

	return state;
}

import { FC, createContext, useRef, useCallback } from 'react';
import { UserContextProps, User } from './types';

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC = ({ children }) => {
	const userRef = useRef<User>(null);
	const listeners = useRef<{ [key: string]: (user: User) => void }>({});

	const setUser = useCallback((newData: User | ((user: User) => User)) => {
		const data = typeof newData === 'function' ? newData(userRef.current) : newData;
		userRef.current = { ...userRef.current, ...data };

		Object.values(listeners.current).forEach((listener) => listener(userRef.current));
	}, []);

	const getUser = useCallback(() => userRef.current, []);

	const registerListener = useCallback((listenerId: string, fn: (user: User) => void) => {
		listeners.current[listenerId] = fn;
	}, []);

	const unregisterListener = useCallback((listenerId: string) => {
		delete listeners.current[listenerId];
	}, []);

	return (
		<UserContext.Provider value={{ setUser, getUser, registerListener, unregisterListener }}>
			{children}
		</UserContext.Provider>
	);
};

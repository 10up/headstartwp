export type User = {
	id?: number;
	name?: string;
} | null;

export type UserContextProps = {
	setUser: (user: User) => void;
	getUser: () => User;
	registerListener: (listenerId: string, fn: (newUser: User) => void) => void;
	unregisterListener: (listenerId: string) => void;
};

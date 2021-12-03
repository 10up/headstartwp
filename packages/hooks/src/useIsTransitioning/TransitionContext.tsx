/* eslint-disable import/no-extraneous-dependencies */
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

type Context = {
	isTransitioning: boolean;
};

type Props = {
	children: ReactNode;
};

const TransitionContext = createContext<Context>({
	isTransitioning: false,
});
TransitionContext.displayName = 'TransitionContext';

const TransitionProvider = ({ children }: Props) => {
	const [isTransitioning, setIsTransitioning] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleStart = () => {
			setIsTransitioning(true);
		};
		const handleStop = () => {
			setIsTransitioning(false);
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};
	}, [router]);

	return (
		<TransitionContext.Provider value={{ isTransitioning }}>
			{children}
		</TransitionContext.Provider>
	);
};

export { TransitionContext, TransitionProvider };

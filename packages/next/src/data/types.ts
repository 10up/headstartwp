import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetStaticProps,
	GetStaticPropsContext,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { PreviewData } from '../handlers/types';

export type HeadlessGetServerSidePropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> =
	GetServerSidePropsContext<Q, PreviewData>;

export type HeadlessGetStaticPropsPropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> =
	GetStaticPropsContext<Q, PreviewData>;

export type HeadlessGetServerSideProps<
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
> = GetServerSideProps<P, Q, PreviewData>;

export type HeadlessGetStaticProps<
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
> = GetStaticProps<P, Q, PreviewData>;

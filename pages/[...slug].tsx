import { FC, memo } from 'react';
import { Container, Typography } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Head from 'next/head';
//
import { QUERY_ALL_PAGES, QUERY_SINGPLE_PAGE } from '../lib/queries/page';
import formatDate from '../lib/utils/formatDate';
import { PageProps } from '../lib/types/pages';
//
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import Content from '../components/Content';
//
import styles from './[...slug].module.scss';

type Props = {
	page: PageProps;
};

const Page: FC<Props> = ({ page }) => {
	if (!page) return <Loader />;

	const { title, content, date } = page;

	return (
		<>
			<Head>
				<title>{title}</title>

				<link
					rel="stylesheet"
					href={`${process.env.WORDPRESS_URL}/wp-includes/css/dist/block-library/style.min.css?ver=5.7.1`}
				/>
			</Head>

			<Layout container={false}>
				<main className={styles.Page}>
					<Container maxWidth="md">
						<div className={styles.PageHeader}>
							<Typography variant="h2" component="h1" className={styles.PageTitle}>
								{title}
							</Typography>
							<span className={styles.PageDate}>
								<CalendarTodayIcon />
								{formatDate(date)}
							</span>
						</div>

						<Content content={content} />
					</Container>
				</main>
			</Layout>
		</>
	);
};

export async function getStaticProps({ params }) {
	const slug = params.slug.join('/');

	const response = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_SINGPLE_PAGE,
			variables: { id: slug },
		}),
	});

	const json = await response.json();
	const page = json.data.page;

	return {
		props: {
			page,
		},
	};
}

export async function getStaticPaths() {
	const allPages: any = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_ALL_PAGES,
		}),
	});

	const {
		data: {
			pages: { edges },
		},
	} = await allPages.json();

	const paths = edges.map(({ node }) => {
		const { uri } = node;
		return {
			params: {
				slug: uri.split('/').filter((i: string) => i),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export default memo(Page);

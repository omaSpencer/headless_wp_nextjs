import { FC, memo, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import qs from 'qs';
import useSWR from 'swr';
import { filter, get, isEmpty } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core';
//
import { fetcher } from '../../lib/utils/fetcher';
import { QUERY_ALL_POSTS } from '../../lib/queries/post';
import { PostListItem } from '../../lib/types/posts';
//
import Loader from '../../components/Loader';
import Layout from '../../components/Layout';
import PostItem from '../../components/PostItem';
//
import postListStyles from '../../components/PostsList/style.module.scss';
import styles from './style.module.scss';

const POSTS_PER_PAGE = parseInt(process.env.POSTS_PER_PAGE);

type Props = {
	allPosts: PostListItem[];
};

const Search: FC<Props> = ({ allPosts }) => {
	const router = useRouter();
	const [page, setPage] = useState<number>(1);
	const [pages, setPages] = useState<number>(0);

	const splitPath = router.asPath.split('?');
	const rawQuery = splitPath.length > 1 ? splitPath[1] : '';
	const parsedQuery = qs.parse(rawQuery, { ignoreQueryPrefix: true });
	const searchTerm = parsedQuery.search as string;

	const filteredPosts = () => {
		if (searchTerm && allPosts) {
			return filter(allPosts, (node) => {
				return node.title.toLowerCase().includes(searchTerm.toLowerCase());
			}).map((post) => post);
		}
	};

	const searchedPosts = filteredPosts();

	useEffect(() => {
		if (!searchTerm) {
			router.push('/');
		}
	}, [searchTerm]);

	const currentPosts = useMemo(() => {
		if (searchTerm && page && searchedPosts && typeof window !== 'undefined') {
			const start = (page - 1) * POSTS_PER_PAGE;
			setPages(Math.ceil(searchedPosts.length / POSTS_PER_PAGE));
			router.push(`${process.env.BASE_URL}/search?search=${searchTerm}?page=${page}`);
			return searchedPosts.slice(start, start + POSTS_PER_PAGE);
		}
	}, [page, searchTerm]);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const hasNoResults = isEmpty(searchedPosts);

	if (!allPosts) {
		return <Loader />;
	}

	if (hasNoResults) {
		return (
			<Layout>
				<section className={styles.Search}>
					<figure className={styles.SearchIllustration}>
						<Image src="/svg/not_found.svg" alt="SearchIllustration" width="300px" height="260px" />
					</figure>
					<Typography variant="h4" component="h1" className={styles.SearchNotFound}>
						No search results try again...
					</Typography>
				</section>
			</Layout>
		);
	}

	return (
		<Layout>
			<section className={postListStyles.PostsList}>
				<Grid container spacing={3}>
					{currentPosts.length > 0 &&
						currentPosts.map((node) => {
							return <PostItem {...node} key={node.slug} />;
						})}
				</Grid>
				{searchedPosts.length > POSTS_PER_PAGE && (
					<Pagination
						className={postListStyles.PostsPagaination}
						color="secondary"
						count={pages}
						page={page}
						onChange={handleChange}
					/>
				)}
			</section>
		</Layout>
	);
};

export async function getStaticProps() {
	const response = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_ALL_POSTS,
		}),
	});

	const json = await response.json();
	const allPosts = json.data.posts.nodes;

	return {
		props: {
			allPosts,
		},
	};
}

export default memo(Search);

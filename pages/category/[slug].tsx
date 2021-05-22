import { FC, memo, useState, useEffect, useMemo } from 'react';
import { Typography } from '@material-ui/core';
import Head from 'next/head';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import Skeleton from '@material-ui/lab/Skeleton';
//
import { QUERY_ALL_POSTS_BY_CATEGORY, QUERY_ALL_POSTS_CATEGORY_SLUG } from '../../lib/queries/post';
import { PostListItem } from '../../lib/types/posts';
import { COMPONENT_LG_HEADING_SIZE } from '../../lib/constants';
//
import Loader from '../../components/Loader';
import Layout from '../../components/Layout';
import PostItem from '../../components/PostItem';
//
import styles from './[slug].module.scss';

const POSTS_PER_PAGE: number = parseInt(process.env.POSTS_PER_PAGE);

type Props = {
	slug: string;
	posts: PostListItem[];
};

const CategoryPosts: FC<Props> = ({ slug, posts }) => {
	const router = useRouter();

	const pageCount = get(router, 'query.page[0]', 1);

	const [page, setPage] = useState<number>(parseInt(pageCount));
	const [pages, setPages] = useState<number>(0);
	const [postsByCategory, setPostsByCategory] = useState<PostListItem[]>(null);

	const currentPosts: PostListItem[] = useMemo(() => {
		if (postsByCategory && slug) {
			const start = (page - 1) * POSTS_PER_PAGE;
			setPages(Math.ceil(postsByCategory.length / POSTS_PER_PAGE));
			router.push(`${process.env.BASE_URL}/category/${slug}?page=${page}`);
			return postsByCategory.slice(start, start + POSTS_PER_PAGE);
		}
	}, [page, postsByCategory]);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	useEffect(() => {
		if (posts && !postsByCategory) {
			setPostsByCategory(posts);
		}
	}, [posts]);

	if (!posts) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>{slug ? slug : ''} category page</title>
			</Head>

			<Layout>
				<section className={styles.CategoryPosts}>
					{slug ? (
						<Typography
							style={{ padding: '20px', textAlign: 'center', color: '#222' }}
							variant="h3"
							component="h1"
						>{`Category: ${slug}`}</Typography>
					) : (
						<Skeleton variant="text" width={280} height={COMPONENT_LG_HEADING_SIZE} />
					)}
					<Grid container spacing={3}>
						{currentPosts &&
							currentPosts.map((post) => {
								return <PostItem {...post} key={post.slug} />;
							})}
					</Grid>
					{currentPosts && pages > 1 && (
						<Pagination
							className={styles.CategoryPostsPagination}
							color="secondary"
							count={pages}
							page={page}
							onChange={handleChange}
						/>
					)}
				</section>
			</Layout>
		</>
	);
};

export async function getStaticPaths() {
	const response = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_ALL_POSTS_CATEGORY_SLUG,
		}),
	});

	const categories = await response.json();

	const paths = categories.data.categories.nodes.map((item) => ({
		params: { slug: item.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const result = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_ALL_POSTS_BY_CATEGORY,
			variables: { id: params.slug },
		}),
	});

	const {
		data: {
			category: {
				posts: { nodes },
			},
		},
	} = await result.json();

	return {
		props: {
			slug: params.slug,
			posts: nodes,
		},
	};
}

export default memo(CategoryPosts);

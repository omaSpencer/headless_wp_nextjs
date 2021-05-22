import { FC, memo, useEffect } from 'react';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Container, Typography } from '@material-ui/core';
import Image from 'next/image';
import Head from 'next/head';
//
import { QUERY_ALL_POSTS_SLUG, QUERY_SINGPLE_POST } from '../../lib/queries/post';
import { PostListItem } from '../../lib/types/posts';
import formatDate from '../../lib/utils/formatDate';
//
import Loader from '../../components/Loader';
import Layout from '../../components/Layout';
import Categories from '../../components/Categories';
import Content from '../../components/Content';
//
import styles from './[slug].module.scss';

interface PostType extends PostListItem {
	content: string;
}

type Props = {
	post: PostType;
};

const Post: FC<Props> = ({ post }) => {
	if (!post || post.error) {
		return <Loader />;
	}

	const featuredImageUrl = post.featuredImage?.node?.sourceUrl;
	const featuredImageAltText = post.featuredImage?.node?.altText || post.title;

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.twttr.widgets.load();
		}
	}, []);

	return (
		<>
			<Head>
				<title>{post && post.title}</title>
				<link
					rel="stylesheet"
					href={`${process.env.WORDPRESS_URL}/wp-includes/css/dist/block-library/style.min.css?ver=5.7.1`}
				/>
				<div id="root"></div>
				<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
			</Head>

			<Layout container={false}>
				<article className={styles.Post}>
					<div className={styles.PostHeader}>
						<div className={styles.PostHeaderInner}>
							<Typography variant="h1" component="h1" className={styles.PostTitle}>
								{post.title}
							</Typography>
							{post.categories && (
								<Categories list={post.categories} className={styles.PostCategories} />
							)}
							<span className={styles.PostDate}>
								<CalendarTodayIcon />
								{formatDate(post.date)}
							</span>
						</div>
						{featuredImageUrl && (
							<figure className={styles.PostHeaderImg}>
								<Image
									src={featuredImageUrl}
									alt={featuredImageAltText || post.title}
									width={960}
									height={500}
								/>
							</figure>
						)}
					</div>
					<Container maxWidth="lg">
						<Content content={post.content} />
					</Container>
				</article>
			</Layout>
		</>
	);
};

export async function getStaticProps({ params }) {
	const response = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_SINGPLE_POST,
			variables: { id: params.slug },
		}),
	});

	const {
		data: { post },
	} = await response.json();

	return {
		props: {
			post,
		},
	};
}

export async function getStaticPaths() {
	const allPosts: any = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_ALL_POSTS_SLUG,
		}),
	});

	const {
		data: {
			posts: { edges },
		},
	} = await allPosts.json();

	return {
		paths: edges.map(({ node }) => `/posts/${node.slug}`) || [],
		fallback: true,
	};
}

export default memo(Post);

import { FC, memo } from 'react';
//
import { QUERY_ALL_POSTS } from '../../lib/queries/post';
import { PostListItem } from '../../lib/types/posts';
//
import Layout from '../../components/Layout';
import PostsList from '../../components/PostsList';
import Loader from '../../components/Loader';

type Props = {
	allPosts: PostListItem[];
};

const Posts: FC<Props> = ({ allPosts }) => {
	if (!allPosts) return <Loader />;
	return (
		<Layout>
			<PostsList allPosts={allPosts} />
		</Layout>
	);
};

export default memo(Posts);

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

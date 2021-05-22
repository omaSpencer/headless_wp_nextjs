import { FC, memo, useState, useEffect } from 'react';
//
import { QUERY_ALL_POSTS } from '../lib/queries/post';
import { PostListItem } from '../lib/types/posts';
//
import Layout from '../components/Layout';
import FeaturedPost from '../components/FeaturedPost';
import RecentPosts from '../components/RecentPosts';
import OnePlusSix from '../components/OnePlusSix/OnePlusSix';
import Loader from '../components/Loader';
import ContactUs from '../components/ContactUs/';

type Props = {
	allPosts: PostListItem[];
	featuredPosts: PostListItem[];
};

const Home: FC<Props> = ({ allPosts, featuredPosts }) => {
	const [firstFeaturedPost, setFirstFeaturedPost] = useState<PostListItem | null>(null);
	const [recentPosts, setRecentPosts] = useState<PostListItem[] | []>([]);

	useEffect(() => {
		if (allPosts) {
			setRecentPosts(allPosts.slice(0, 12));
		}

		if (featuredPosts) {
			setFirstFeaturedPost(featuredPosts[0]);
		}
	}, [allPosts, featuredPosts]);

	if (!featuredPosts || !allPosts) return <Loader />;

	return (
		<Layout>
			<>
				<ContactUs />
				{featuredPosts && <OnePlusSix list={featuredPosts} />}
				{firstFeaturedPost && <FeaturedPost {...firstFeaturedPost} />}
				{recentPosts.length && <RecentPosts list={recentPosts} />}
			</>
		</Layout>
	);
};

export default memo(Home);

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
	const featuredPosts = allPosts.filter((node) => node.postCustomFields.featuredPost === true);

	return {
		props: { allPosts, featuredPosts },
		revalidate: 1,
	};
}

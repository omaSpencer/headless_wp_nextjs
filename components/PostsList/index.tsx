import { FC, memo, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import { get } from 'lodash';
import Pagination from '@material-ui/lab/Pagination';
//
import { PostListItem } from '../../lib/types/posts';
//
import PostItem from '../PostItem';
import Loader from '../Loader';
//
import styles from './style.module.scss';

const POSTS_PER_PAGE: number = parseInt(process.env.POSTS_PER_PAGE);

type Props = {
	allPosts: PostListItem[];
};

const PostsList: FC<Props> = ({ allPosts }) => {
	const router = useRouter();
	const pageCount = get(router, 'query.page[0]', 1);
	const [page, setPage] = useState<number>(parseInt(pageCount));
	const [pages, setPages] = useState<number>(0);
	const [posts, setPosts] = useState<PostListItem[]>(null);

	const currentPosts = useMemo(() => {
		if (posts) {
			const start = (page - 1) * POSTS_PER_PAGE;
			setPages(Math.ceil(posts.length / POSTS_PER_PAGE));
			router.push(`${process.env.BASE_URL}/posts?page=${page}`);
			return posts.slice(start, start + POSTS_PER_PAGE);
		}
	}, [posts, page]);

	useEffect(() => {
		if (router && allPosts) {
			setPosts(allPosts);
		}
	}, []);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	if (!posts) {
		return <Loader />;
	}

	return (
		<section className={styles.PostsList}>
			<Grid container spacing={3}>
				{currentPosts.length > 0 &&
					currentPosts.map((item) => {
						return <PostItem {...item} key={item.slug} />;
					})}
			</Grid>
			{posts.length > POSTS_PER_PAGE && (
				<Pagination
					className={styles.PostsPagaination}
					color="secondary"
					count={pages}
					page={page}
					onChange={handleChange}
				/>
			)}
		</section>
	);
};

export default memo(PostsList);

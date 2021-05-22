import { FC, memo } from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
//
import { PostListItem } from '../../lib/types/posts';
//
import PostItem from '../PostItem';
//
import styles from './style.module.scss';

type Props = {
	list: PostListItem[];
};

export const RecentPostsItemBreakpoints = {
	lg: 3,
	md: 4,
	sm: 6,
	xs: 12,
};

const RecentPosts: FC<Props> = ({ list }) => {
	return (
		<section className={styles.RecentPosts}>
			<Grid container spacing={3}>
				{list &&
					list.map((item) => {
						return <PostItem breakpoints={RecentPostsItemBreakpoints} {...item} key={item.slug} />;
					})}
			</Grid>

			<div className={styles.RecentPostsCta}>
				<Button variant="contained" color="secondary" style={{ color: 'white' }}>
					<Link href={`/posts?page=${1}`}>
						<a>More Posts</a>
					</Link>
				</Button>
			</div>
		</section>
	);
};

export default memo(RecentPosts);

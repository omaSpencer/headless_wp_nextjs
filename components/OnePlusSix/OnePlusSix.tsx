import { FC, memo } from 'react';
//
import { PostListItem } from '../../lib/types/posts';
//
import Loader from '../Loader';
import Featured from './components/Featured';
import Item from './components/Item';
//
import styles from './style.module.scss';

type Props = {
	list: PostListItem[];
};

const OnePlusSix: FC<Props> = ({ list }) => {
	const firstPost = list[0];

	if (!list) {
		return (
			<>
				<Loader />
			</>
		);
	}

	return (
		<section className={styles.OnePlusSix}>
			<div className={styles.OnePlusSixFeatured}>
				<Featured {...firstPost} />
			</div>
			{list &&
				list.slice(1).map((item) => {
					return <Item {...item} className={styles.OnePlusSixItem} key={item.slug} />;
				})}
		</section>
	);
};

export default memo(OnePlusSix);

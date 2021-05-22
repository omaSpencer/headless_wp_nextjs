import { FC, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
//
import { COMPONENT_LG_IMG_SIZE, COMPONENT_XL_IMG_SIZE } from '../../../../lib/constants';
import { PostListItem } from '../../../../lib/types/posts';
import formatDate from '../../../../lib/utils/formatDate';
//
import Categories from '../../../Categories';
//
import styles from './style.module.scss';

type Props = PostListItem;

const Featured: FC<Props> = ({ title, excerpt, categories, date, slug, featuredImage }) => {
	const {
		node: { sourceUrl, altText },
	} = featuredImage;

	return (
		<article className={styles.FeaturedArticle}>
			<figure className={styles.FeaturedImage}>
				<Link href={`/posts/${slug}`}>
					<a>
						<Image
							src={sourceUrl}
							alt={altText || title}
							width={COMPONENT_XL_IMG_SIZE}
							height={COMPONENT_LG_IMG_SIZE}
						/>
					</a>
				</Link>
			</figure>

			<div className={styles.FeaturedContent}>
				<Typography variant="h2" component="h2">
					<Link href={`/posts/${slug}`}>
						<a>{title}</a>
					</Link>
				</Typography>
				{categories && <Categories className={styles.FeaturedCategories} list={categories} />}
				<span className={styles.FeaturedDate}>{formatDate(date)}</span>
				<div dangerouslySetInnerHTML={{ __html: excerpt }} />
			</div>
		</article>
	);
};

export default memo(Featured);

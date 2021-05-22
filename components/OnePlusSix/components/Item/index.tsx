import { truncate } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { FC, memo, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
//
import { PostListItem } from '../../../../lib/types/posts';
import { COMPONENT_LG_IMG_SIZE, COMPONENT_XL_IMG_SIZE } from '../../../../lib/constants';
import formatDate from '../../../../lib/utils/formatDate';
//
import Loader from '../../../Loader';
import Categories from '../../../Categories';
//
import styles from './style.module.scss';

interface Props extends PostListItem {
	className?: any;
}

const Item: FC<Props> = ({ title, excerpt, featuredImage, slug, date, categories, className = null }) => {
	const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
	const [featuredImageAltText, setFeaturedImageAltText] = useState<string | null>(null);

	const truncatedExcerpt = truncate(excerpt, {
		length: 140,
		omission: ' [...]',
	});

	const classNamesItem = `${styles.Item} ${className}`;

	useEffect(() => {
		if (featuredImage) {
			setFeaturedImageUrl(featuredImage.node?.sourceUrl);
			setFeaturedImageAltText(featuredImage.node?.altText);
		}
	}, [featuredImage]);

	if (!title) {
		return (
			<>
				<Loader />
			</>
		);
	}

	return (
		<article className={classNamesItem}>
			{featuredImage && featuredImageUrl && (
				<figure className={styles.ItemFeaturedImage}>
					<Link href={`/posts/${slug}`}>
						<a>
							<Image
								src={featuredImageUrl}
								alt={featuredImageAltText || title}
								width={COMPONENT_XL_IMG_SIZE}
								height={COMPONENT_LG_IMG_SIZE}
							/>
						</a>
					</Link>
				</figure>
			)}
			<div className={styles.ItemContent}>
				{categories && <Categories className={styles.ItemCategories} list={categories} />}
				<span className={styles.ItemDate}>{formatDate(date)}</span>
				<Typography className={styles.ItemTitle} variant="h5" component="h5">
					<Link href={`/posts/${slug}`}>
						<a>{title}</a>
					</Link>
				</Typography>
				<div dangerouslySetInnerHTML={{ __html: truncatedExcerpt }}></div>
			</div>
		</article>
	);
};

export default memo(Item);

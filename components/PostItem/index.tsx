import { FC, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { truncate } from 'lodash';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
//
import { PostListItem } from '../../lib/types/posts';
import formatDate from '../../lib/utils/formatDate';
import { COMPONENT_MD_IMG_SIZE } from '../../lib/constants';
//
import Categories from '../Categories';
import Loader from '../Loader';
import SkeletonUI from './components/Skeleton';
//
import styles from './style.module.scss';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			maxWidth: 345,
		},
	})
);

export type PostListItemBreakpoints = {
	lg: number;
	md: number;
	sm: number;
	xs: number;
};

interface Props extends PostListItem {
	className?: any;
	breakpoints?: any;
}

const PostItem: FC<Props> = ({
	title,
	excerpt,
	featuredImage,
	slug,
	date,
	categories,
	className = null,
	breakpoints = { lg: 4, md: 4, sm: 6, xs: 12 },
}) => {
	const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
	const [featuredImageAltText, setFeaturedImageAltText] = useState<string | null>(null);

	const truncatedExcerpt = truncate(excerpt, {
		length: 140,
		omission: ' [...]',
	});

	const classes = useStyles();
	const classNamesPostItem = `${classes} ${styles.PostItem} ${className}`;

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
				<SkeletonUI breakpoints={breakpoints} />
			</>
		);
	}

	return (
		<Grid item lg={breakpoints.lg} md={breakpoints.md} sm={breakpoints.sm} xs={breakpoints.xs}>
			<Card className={classNamesPostItem}>
				{featuredImageUrl && (
					<figure className={styles.PostItemMedia}>
						<Link href={`/posts/${slug}`}>
							<a>
								<Image
									src={featuredImageUrl}
									alt={featuredImageAltText || title}
									width={COMPONENT_MD_IMG_SIZE}
									height={COMPONENT_MD_IMG_SIZE}
								/>
							</a>
						</Link>
					</figure>
				)}
				<CardContent className={styles.PostItemContent}>
					{categories && <Categories list={categories} className={styles.PostItemCategories} />}
					{title && (
						<Typography gutterBottom variant="h5" component="h2">
							<Link href={`/posts/${slug}`}>
								<a>{title}</a>
							</Link>
						</Typography>
					)}
					<div
						className={styles.PostItemExcerpt}
						dangerouslySetInnerHTML={{ __html: truncatedExcerpt }}
					/>
					<div className={styles.PostItemFooter}>
						<Button
							className={styles.PostItemButton}
							variant="outlined"
							size="small"
							color="inherit"
							href={`/posts/${slug}`}
						>
							Read More
						</Button>
						<span className={styles.PostItemDate}>{formatDate(date)}</span>
					</div>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default memo(PostItem);

import { FC, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//
import { PostListItem } from '../../lib/types/posts';
import { COMPONENT_LG_IMG_SIZE, COMPONENT_XXL_IMG_SIZE } from '../../lib/constants';
//
import styles from './style.module.scss';

type Props = PostListItem;

const FeaturedPost: FC<Props> = ({ title, slug, excerpt, featuredImage }) => {
	const featuredImageUrl = featuredImage.node?.sourceUrl || null;
	const featuredImageAltText = featuredImage.node?.altText || title;

	return (
		<article className={styles.FeaturedPost}>
			<Paper elevation={2} style={{ background: 'rgb(226, 125, 95)' }}>
				<Grid container>
					{featuredImageUrl && (
						<Grid className={styles.FeaturedPostImg} item md={6}>
							<Link href={`/posts/${slug}`}>
								<a>
									<Image
										src={featuredImageUrl}
										alt={featuredImageAltText || title}
										width={COMPONENT_XXL_IMG_SIZE}
										height={COMPONENT_LG_IMG_SIZE}
									/>
								</a>
							</Link>
						</Grid>
					)}
					<Grid className={styles.FeaturedPostContent} item md={6}>
						{title && (
							<Typography className={styles.FeaturedPostTitle} variant="h3" component="h1">
								<Link href={`/posts/${slug}`}>
									<a>{title}</a>
								</Link>
							</Typography>
						)}
						{excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>}
						<Button variant="contained" color="primary" size="large" href={`/posts/${slug}`}>
							Read More
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</article>
	);
};

export default memo(FeaturedPost);

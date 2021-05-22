import { FC, memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
//
import { COMPONENT_MD_IMG_SIZE } from '../../../../lib/constants';
//
import styles from '../../style.module.scss';

type Props = {
	breakpoints: any;
	className?: any;
};

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			maxWidth: 345,
		},
	})
);

const SkeletonUI: FC<Props> = ({ breakpoints, className = null }) => {
	const classes = useStyles();
	const classNamesPostItem = `${classes} ${styles.PostItem} ${className}`;

	return (
		<Grid item lg={breakpoints.lg} md={breakpoints.md} sm={breakpoints.sm} xs={breakpoints.xs}>
			<Card className={classNamesPostItem}>
				<Skeleton variant="rect" width={394} height={COMPONENT_MD_IMG_SIZE} />
				<CardContent className={styles.PostItemContent}>
					<Skeleton variant="text" width={COMPONENT_MD_IMG_SIZE} height={COMPONENT_MD_IMG_SIZE} />
					<Skeleton variant="text" width={COMPONENT_MD_IMG_SIZE} height={COMPONENT_MD_IMG_SIZE} />
					<Skeleton variant="text" width={COMPONENT_MD_IMG_SIZE} height={COMPONENT_MD_IMG_SIZE} />
					<div className={styles.PostItemFooter}>
						<Button
							className={styles.PostItemButton}
							variant="outlined"
							size="small"
							color="primary"
							href={`/posts/`}
						>
							Read More
						</Button>
						<Skeleton variant="text" width={COMPONENT_MD_IMG_SIZE} height={COMPONENT_MD_IMG_SIZE} />
					</div>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default memo(SkeletonUI);

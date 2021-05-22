import { FC, memo } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
//
import styles from './style.module.scss';

const Logo: FC<{}> = () => {
	return (
		<div className={styles.Logo}>
			<Typography className={styles.LogoDesktop} variant="h6" noWrap>
				<Link href="/">
					<a>MyBlog</a>
				</Link>
			</Typography>

			<Typography className={styles.LogoMobile} variant="h6">
				<Link href="/">
					<a>
						<HomeIcon />
					</a>
				</Link>
			</Typography>
		</div>
	);
};

export default memo(Logo);

import { FC, memo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
//
import styles from './style.module.scss';

const Loader: FC<{}> = () => {
	return (
		<div className={styles.Loader}>
			<CircularProgress color="secondary" />
		</div>
	);
};

export default memo(Loader);

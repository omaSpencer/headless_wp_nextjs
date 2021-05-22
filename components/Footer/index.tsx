import { FC, memo } from 'react';
//
import styles from './style.module.scss';

const Footer: FC<{}> = () => {
	const date = new Date();

	return (
		<footer className={styles.Footer}>
			<p>&copy; {date.getFullYear()} | MyBlog</p>
		</footer>
	);
};

export default memo(Footer);

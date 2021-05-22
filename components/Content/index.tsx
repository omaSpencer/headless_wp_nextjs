import { FC, memo } from 'react';
//
import styles from './style.module.scss';

type Props = {
	content: string;
};

const Content: FC<Props> = ({ content }) => {
	return <div className={styles.Content} dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default memo(Content);

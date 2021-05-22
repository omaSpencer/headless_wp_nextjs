import { FC, memo } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
//
import styles from './style.module.scss';

const SocialLinks: FC<{}> = () => {
	return (
		<div className={styles.SocialLinks}>
			<ul>
				<li>
					<a href="https://google.com" target="_blank" rel="nofollow">
						<FacebookIcon />
					</a>
				</li>
				<li>
					<a href="https://google.com" target="_blank" rel="nofollow">
						<InstagramIcon />
					</a>
				</li>
				<li>
					<a href="https://google.com" target="_blank" rel="nofollow">
						<TwitterIcon />
					</a>
				</li>
				<li>
					<a href="https://google.com" target="_blank" rel="nofollow">
						<YouTubeIcon />
					</a>
				</li>
			</ul>
		</div>
	);
};

export default memo(SocialLinks);

import { Typography } from '@material-ui/core';
import Image from 'next/image';
import { FC, memo } from 'react';
//
import Form from './components/Form';
//
import styles from './style.module.scss';

const ContactUs: FC<{}> = () => {
	return (
		<section className={styles.ContactUs}>
			<div className={styles.ContactUsInner}>
				<Typography variant="h2" component="h2" className={styles.ContactUsTitle}>
					Contact Us
				</Typography>

				<Form />
			</div>

			<div className={styles.ContactUsIllustration}>
				<Image src="/svg/contact_us.svg" alt="Contact Us Illustration" width={700} height={500} />
			</div>
		</section>
	);
};

export default memo(ContactUs);

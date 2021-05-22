import { Button } from '@material-ui/core';
import { FC, memo, useState, useEffect, FormEvent } from 'react';
import { get, replace } from 'lodash';
import Link from 'next/link';
import WPAPI from 'wpapi';
//
import CF7Sender from '../../../../lib/utils/CF7Sender';
import { InvalidFields } from '../../../../lib/types/CF7';
import { ControlledTextFieldTypes } from '../../../../lib/constants';
import { NotificationsProps } from '../../../Notifications';
import { SelectProps } from '../../../../lib/types/forms/select';
import { TextFieldProps } from '../../../../lib/types/forms/textField';
import { CheckboxProps } from '../../../../lib/types/forms/checkbox';
import { FileUploadProps } from '../../../../lib/types/forms/fileUpload';
//
import Loader from '../../../Loader';
import Notifications from '../../../Notifications';
import ControlledTextField from '../../../Forms/ControlledTextField';
import ControlledSelect from '../../../Forms/ControlledSelect';
import ControlledCheckbox from '../../../Forms/ControlledCheckbox';
import ControlledFileUpload from '../../../Forms/ControlledFileUpload';
//
import styles from './style.module.scss';

const Form: FC<{}> = () => {
	const [contactType, setContactType] = useState<SelectProps>({
		failed: false,
		value: '',
		id: 'contact_type',
		errorMessage: '',
		options: [
			{
				id: 'contact_type_chatting',
				text: 'Chatting',
			},
			{
				id: 'contact_type_career',
				text: 'Career',
			},
			{
				id: 'contact_type_order',
				text: 'Order',
			},
		],
	});
	const [name, setName] = useState<TextFieldProps>({ failed: false, value: '', id: 'your_name', errorMessage: '' });
	const [email, setEmail] = useState<TextFieldProps>({
		failed: false,
		value: '',
		id: 'your_email',
		errorMessage: '',
	});
	const [subject, setSubject] = useState<TextFieldProps>({
		failed: false,
		value: '',
		id: 'your_subject',
		errorMessage: '',
	});
	const [message, setMessage] = useState<TextFieldProps>({
		failed: false,
		value: '',
		id: 'your_message',
		errorMessage: '',
	});
	const [acceptTerms, setAcceptTerms] = useState<CheckboxProps>({
		id: 'accept_terms',
		errorMessage: '',
		failed: false,
		checked: false,
	});
	const [attachment, setAttachment] = useState<FileUploadProps>({
		id: 'attachment_file',
		accept: 'image/*',
		value: '',
		file: null,
		fileName: '',
		errorMessage: '',
		failed: false,
		multiple: false,
	});
	const [filePreviewSrc, setFilePreviewSrc] = useState(null);

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [notifications, setNotifications] = useState<NotificationsProps | null>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		let formData = new FormData();

		formData.set('contact_type', contactType.value as string);
		formData.set('your_name', name.value);
		formData.set('your_email', email.value);
		formData.set('your_subject', subject.value);
		formData.set('your_message', message.value);

		if (acceptTerms.checked) {
			formData.set('accept_terms', 'checked');
		}

		if (attachment.file) {
			formData.set('attachment_file', attachment.fileName);
		}

		CF7Sender(1857, formData, setIsLoading, setNotifications, setError, () => {
			if (attachment.file) {
				setIsLoading(true);

				const wp = new WPAPI({
					endpoint: `${process.env.WORDPRESS_URL}/wp-json`,
					username: process.env.WP_ADMIN_USERNAME,
					password: process.env.WP_ADMIN_PASSWORD,
				});

				wp.media()
					.file(attachment.file)
					.create({
						title: attachment.fileName,
						alt_text: attachment.fileName,
					})
					.then(function (res) {
						setNotifications({
							open: true,
							statusCode: 200,
							message: `Image upload success: ${res.title.raw}`,
							duration: 5000,
						});

						setIsLoading(false);
					})
					.catch((err) => {
						const statusCode = get(err, 'response.data.data.status', undefined);
						const message = get(err, 'response.data.message', undefined);

						if (statusCode && message) {
							setNotifications({
								open: true,
								statusCode,
								message,
								duration: 5000,
							});
						} else {
							console.error(error);
						}

						setIsLoading(false);
					});
			}

			// Clear States on Success
			setContactType({ ...contactType, failed: false, errorMessage: '', value: '' });
			setName({ ...name, failed: false, errorMessage: '', value: '' });
			setEmail({ ...email, failed: false, errorMessage: '', value: '' });
			setSubject({ ...subject, failed: false, errorMessage: '', value: '' });
			setMessage({ ...message, failed: false, errorMessage: '', value: '' });
			setAcceptTerms({ ...acceptTerms, checked: false });
			setAttachment({
				...attachment,
				value: '',
				fileName: '',
				file: null,
				errorMessage: '',
				failed: false,
				multiple: false,
			});
			setFilePreviewSrc(null);
		});
	};

	useEffect(() => {
		if (error) {
			error.forEach((err: InvalidFields) => {
				const fieldId = replace(err.error_id, '-ve-', '');

				switch (fieldId) {
					case contactType.id:
						setContactType({ ...contactType, failed: true, errorMessage: err.message });
						break;
					case name.id:
						setName({ ...name, failed: true, errorMessage: err.message });
						break;
					case email.id:
						setEmail({ ...email, failed: true, errorMessage: err.message });
						break;
					case subject.id:
						setSubject({ ...email, failed: true, errorMessage: err.message });
						break;
					case message.id:
						setMessage({ ...email, failed: true, errorMessage: err.message });
						break;
					case acceptTerms.id:
						setAcceptTerms({ ...acceptTerms, failed: true, errorMessage: err.message });
						break;
					case attachment.id:
						setAttachment({ ...attachment, failed: true, errorMessage: err.message });
						break;

					default:
						break;
				}
			});
		}
	}, [error]);

	return (
		<>
			{notifications?.open && <Notifications {...notifications} clearNotifications={setNotifications} />}

			{isLoading && <Loader />}

			<section className={styles.Form}>
				<form
					noValidate
					autoComplete="off"
					onSubmit={(e) => handleSubmit(e)}
					acceptCharset="UTF-8"
					method="POST"
					encType="multipart/form-data"
				>
					<div className={styles.FormRow}>
						<ControlledSelect
							title="Contact Type"
							state={contactType}
							setState={setContactType}
							required
						/>
					</div>
					<div className={styles.FormRow}>
						<ControlledTextField state={name} title="Your Name" setState={setName} />
					</div>
					<div className={styles.FormRow}>
						<ControlledTextField
							type={ControlledTextFieldTypes.EMAIL}
							state={email}
							title="Your Email"
							setState={setEmail}
						/>
					</div>
					<div className={styles.FormRow}>
						<ControlledTextField state={subject} title="Your Subject" setState={setSubject} />
					</div>
					<div className={styles.FormRow}>
						<ControlledTextField state={message} title="Message" setState={setMessage} multiline />
					</div>
					<div className={styles.FormRow}>
						<ControlledFileUpload
							state={attachment}
							setState={setAttachment}
							filePreviewSrc={filePreviewSrc}
							setFilePreviewSrc={setFilePreviewSrc}
						/>
					</div>
					<div className={styles.FormRow}>
						<ControlledCheckbox
							state={acceptTerms}
							setState={setAcceptTerms}
							label={
								<span className={styles.CheckboxLabel}>
									<span>Please read and accept our</span>{' '}
									<Link href="/terms-and-conditions">
										<a>Terms &amp; Conditions</a>
									</Link>
									{'.'}
								</span>
							}
						/>
					</div>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						className={styles.FormSubmit}
					>
						Submit
					</Button>
				</form>
			</section>
		</>
	);
};

export default memo(Form);

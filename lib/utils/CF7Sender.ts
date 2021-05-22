import axios from 'axios';
import { get } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
//
import { NotificationsProps } from '../../components/Notifications';
import { CF7ResponseStatus } from '../constants';
import { CF7Response } from '../types/CF7';

const CF7Sender = (
	formId: number,
	formData: FormData,
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	setNotifications: Dispatch<SetStateAction<NotificationsProps>>,
	setError: Dispatch<any>,
	handleSuccess: () => void
	// handleValidationFailed?: () => void,
	// handleError?: () => void
) => {
	axios.post(`${process.env.WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, formData, {
		headers: {
			'content-type': 'multipart/form-data',
		},
	})
		.then((res: CF7Response) => {
			setIsLoading(true);

			if (res.data?.status === CF7ResponseStatus.VALIDATION_FAILED) {
				setIsLoading(false);

				setNotifications({
					open: true,
					statusCode: res.data.status,
					message: res.data.message,
					duration: 5000,
				});

				setError(res.data.invalid_fields);

				// handleValidationFailed();
			} else {
				setIsLoading(false);

				setNotifications({
					open: true,
					statusCode: res.data.status,
					message: res.data.message,
					duration: 5000,
				});

				setError(null);
				handleSuccess();
			}
		})
		.catch((err) => {
			setIsLoading(false);

			const errStatus = get(err, 'response.data.data.status', undefined);
			const errMessage = get(err, 'response.data.message', undefined);

			if (!!errStatus && !!errMessage) {
				setNotifications({
					open: true,
					statusCode: errStatus,
					message: errMessage,
					duration: 5000,
				});
			} else {
				console.error(err);
			}

			// handleError();
		});
};

export default CF7Sender;

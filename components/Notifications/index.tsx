import { FC, memo, useState, Dispatch, SetStateAction } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
//
import { CF7ResponseStatus } from '../../lib/constants';

export type NotificationsProps = {
	message: string;
	statusCode: number | string;
	duration: number;
	open: boolean;
	clearNotifications?: Dispatch<SetStateAction<NotificationsProps>>;
};

export const Alert: FC<AlertProps> = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notifications: FC<NotificationsProps> = ({ open, message, statusCode, duration, clearNotifications }) => {
	const [isOpen, setIsOpen] = useState<boolean>(open);

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsOpen(false);
		clearNotifications(null);
	};

	const severityMapper = {
		200: 'success',
		400: 'error',
		404: 'error',
		500: 'error',
	};

	const handleSeverity = (statusCode: number | string | CF7ResponseStatus) => {
		if (typeof statusCode === 'number') return severityMapper[statusCode];

		switch (statusCode) {
			case CF7ResponseStatus.VALIDATION_FAILED:
				return 'warning';
			case CF7ResponseStatus.MAIL_SENT:
				return 'success';

			default:
				return 'info';
		}
	};

	return (
		<Snackbar open={isOpen} autoHideDuration={duration} onClose={handleClose}>
			<Alert severity={handleSeverity(statusCode)} onClose={handleClose}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default memo(Notifications);

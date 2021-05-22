import { FC, memo, Dispatch, SetStateAction } from 'react';
import TextField from '@material-ui/core/TextField';
//
import { TextFieldProps } from '../../../lib/types/forms/textField';
import { ControlledTextFieldTypes } from '../../../lib/constants';

type Props = {
	type?: ControlledTextFieldTypes;
	state: TextFieldProps;
	title: string;
	setState: Dispatch<SetStateAction<TextFieldProps>>;
	multiline?: boolean;
	rows?: number;
	required?: boolean;
};

const ControlledTextField: FC<Props> = ({
	type = ControlledTextFieldTypes.TEXT,
	title,
	state,
	setState,
	multiline = false,
	rows = 4,
	required = false,
}) => {
	return (
		<TextField
			type={type}
			label={title}
			name={state.id}
			id={state.id}
			onChange={(e) =>
				setState({
					...state,
					value: e.target.value,
					failed: e.target.value !== '' ? false : true,
					errorMessage: e.target.value !== '' && '',
				})
			}
			value={state.value}
			error={state.failed}
			helperText={state.errorMessage}
			required={required}
			multiline={multiline}
			rows={multiline ? rows : 0}
		/>
	);
};

export default memo(ControlledTextField);

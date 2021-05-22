import { Dispatch, FC, memo, SetStateAction } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormHelperText } from '@material-ui/core';
//
import { CheckboxProps } from '../../../lib/types/forms/checkbox';

type Props = {
	state: CheckboxProps;
	label: any;
	setState: Dispatch<SetStateAction<CheckboxProps>>;
	required?: boolean;
	className?: any;
};

const ControlledCheckbox: FC<Props> = ({ label, state, setState, required = false }) => {
	return (
		<FormControl required={required} error={state.failed}>
			<FormControlLabel
				control={
					<Checkbox
						checked={state.checked}
						onChange={(e) =>
							setState({
								...state,
								checked: e.target.checked,
								failed: e.target.checked ? false : true,
							})
						}
						name={state.id}
					/>
				}
				label={label}
			/>
			{state.failed && <FormHelperText>{state.errorMessage}</FormHelperText>}
		</FormControl>
	);
};

export default memo(ControlledCheckbox);

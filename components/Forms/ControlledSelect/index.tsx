import { FC, memo, Dispatch, SetStateAction } from 'react';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
//
import { SelectOptionsProps, SelectProps } from '../../../lib/types/forms/select';

type Props = {
	state: SelectProps;
	title: string;
	setState: Dispatch<SetStateAction<SelectProps>>;
	required?: boolean;
};

const ControlledSelect: FC<Props> = ({ title, state, setState, required }) => {
	return (
		<>
			<InputLabel htmlFor={state.id} error={state.failed} required style={{ marginBottom: '10px' }}>
				{title}
			</InputLabel>
			<Select
				native
				name={state.id}
				id={state.id}
				value={state.value}
				onChange={(e) =>
					setState({
						...state,
						value: e.target.value as string,
						failed: e.target.value !== '' ? false : true,
						errorMessage: !!state.value && '',
					})
				}
				inputProps={{
					name: state.id,
					id: state.id,
				}}
				error={state.failed}
				required={required}
			>
				<option aria-label="None" value="" />
				{state.options.map((option: SelectOptionsProps) => (
					<option value={option.text} key={option.id}>
						{option.text}
					</option>
				))}
			</Select>
			<FormHelperText component="span" error={state.failed}>
				{state.errorMessage}
			</FormHelperText>
		</>
	);
};

export default memo(ControlledSelect);

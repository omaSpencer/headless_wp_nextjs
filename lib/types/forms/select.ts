export type SelectOptionsProps = {
	id: string | number;
	text: string;
};

export type SelectProps = {
	failed: boolean;
	value: string;
	id: string;
	errorMessage: string;
	options: SelectOptionsProps[];
};

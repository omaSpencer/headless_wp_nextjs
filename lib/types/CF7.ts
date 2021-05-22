export type InvalidFields = {
	error_id: string;
	message: string;
};

export type CF7Response = {
	data: {
		status: string;
		message: string;
		invalid_fields?: InvalidFields[];
	};
};

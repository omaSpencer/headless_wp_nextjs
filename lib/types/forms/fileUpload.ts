export type FileUploadProps = {
	id: string;
	accept: string;
	value: string;
	file: File;
	fileName: string;
	errorMessage: string;
	failed: boolean;
	multiple: boolean;
};

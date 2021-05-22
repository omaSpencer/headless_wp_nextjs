import { Button } from '@material-ui/core';
import Image from 'next/image';
import { Dispatch, FC, memo, SetStateAction } from 'react';
//
import { FileUploadProps } from '../../../lib/types/forms/fileUpload';
import filePreview from '../../../lib/utils/filePreview';
//
import styles from './style.module.scss';

type Props = {
	state: FileUploadProps;
	setState: Dispatch<SetStateAction<FileUploadProps>>;
	filePreviewSrc: string;
	setFilePreviewSrc: Dispatch<SetStateAction<string | null>>;
};

const ControlledFileUpload: FC<Props> = ({ state, setState, filePreviewSrc, setFilePreviewSrc }) => {
	return (
		<div className={styles.FileUpload}>
			<input
				accept={state.accept}
				multiple={state.multiple}
				type="file"
				name={state.id}
				id={state.id}
				value={state.value}
				onChange={(e) => {
					if (typeof e.target.files[0] !== 'undefined') {
						filePreview(e.target, setFilePreviewSrc);
						setState({
							...state,
							value: e.target.value,
							file: e.target.files[0],
							fileName: e.target.files[0].name,
						});
					} else {
						setState({
							...state,
							value: '',
							file: null,
							fileName: '',
							errorMessage: '',
							failed: false,
							multiple: false,
						});
						setFilePreviewSrc(null);
					}
				}}
			/>
			<div className={styles.FileActions}>
				<label htmlFor={state.id} className={styles.FileUploadBtn}>
					upload file
				</label>
				{!!state.file && (
					<Button
						variant="outlined"
						color="default"
						size="small"
						style={{
							marginLeft: '20px',
						}}
						onClick={() => {
							setState({
								...state,
								value: '',
								file: null,
								fileName: '',
								errorMessage: '',
								failed: false,
								multiple: false,
							});
							setFilePreviewSrc(null);
						}}
					>
						Cancel
					</Button>
				)}
			</div>
			{state.fileName !== '' && <span className={styles.FileName}>{state.fileName}</span>}
			{filePreviewSrc && (
				<div className={styles.FilePreview}>
					<Image src={filePreviewSrc} alt={state.fileName} width={300} height={300} />
				</div>
			)}
		</div>
	);
};

export default memo(ControlledFileUpload);

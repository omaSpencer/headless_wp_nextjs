import { Dispatch } from 'react';

const filePreview = (file: any, setSrc: Dispatch<any>) => {
	if (file.files && file.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			setSrc(e.target.result);
		};

		reader.readAsDataURL(file.files[0]);
	}
};

export default filePreview;

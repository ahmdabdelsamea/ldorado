import { useEffect, useState } from 'react';

import { UploadProgressBar } from './UploadProgressBar';
import './upload.css';

export const SingleFileUpload = ({ file, onDelete, onUpload }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const upload = async () => {
			const url = await uploadFile(file, setProgress);

			onUpload(file, url);
		};

		upload();
	}, []);

	return (
		<div className='upload-grid'>
			<UploadProgressBar
				progress={progress}
				title={file.name}
				file={file}
				onDelete={onDelete}
			/>
		</div>
	);
};

const uploadFile = (file, onProgress) => {
	const url = 'https://api.cloudinary.com/v1_1/ahmdlbna/image/upload';
	const key = 'ldorado';

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url);

		xhr.onload = () => {
			const response = JSON.parse(xhr.responseText);
			resolve(response.secure_url);
		};
		xhr.onerror = (evt) => reject(evt);
		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentage = (event.loaded / event.total) * 100;
				onProgress(Math.round(percentage));
			}
		};

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', key);

		xhr.send(formData);
	});
};

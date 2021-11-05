import React from 'react';
import { UploadProgressBar } from './UploadProgressBar';

export const UploadError = ({ file, errors, onDelete }) => {
	return (
		<div>
			<UploadProgressBar
				progress={0}
				title={'Files must be Image type: Click Delete'}
				file={file}
				onDelete={onDelete}
			/>
			{/* {errors.map((error) => (
				<div>{error.message}</div>
			))} */}
		</div>
	);
};

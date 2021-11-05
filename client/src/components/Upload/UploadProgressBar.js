import React from 'react';
import { FaTrash } from 'react-icons/fa';

import './upload.css';

export const UploadProgressBar = ({ file, title, progress, onDelete }) => {
	return (
		<div className='upload-progress-grid'>
			<div className='progress'>
				<div className='progress-fill' style={{ width: `${progress}%` }}></div>
				<span className='progress-text'>{title}</span>
				<span className='progress-percentage'>{progress}%</span>
			</div>
			<button className='delete-img-btn' onClick={() => onDelete(file)}>
				<FaTrash />
			</button>
		</div>
	);
};

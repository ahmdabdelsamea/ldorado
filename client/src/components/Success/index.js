import React from 'react';
import './success.css';

export const Success = ({ success }) => {
	return (
		<div className='success'>
			<h1>{success}</h1>
		</div>
	);
};

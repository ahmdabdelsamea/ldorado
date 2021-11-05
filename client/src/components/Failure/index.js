import React from 'react';
import './failure.css';

export const Failure = ({ failure }) => {
	return (
		<div className='failure'>
			<h1>{failure}</h1>
		</div>
	);
};

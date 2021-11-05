import './progress.css';
import React from 'react';

export const ProgressBar = ({ noSharesLeft }) => {
	let totalShares = 1000000;
	let percentage = (noSharesLeft / totalShares) * 100;

	return (
		<div className='progress'>
			<div className='progress-fill' style={{ width: `${percentage}%` }}></div>
			<span className='progress-text'>{noSharesLeft} Shares Left</span>
			{/* <span className='progress-percentage'>{percentage}%</span> */}
		</div>
	);
};

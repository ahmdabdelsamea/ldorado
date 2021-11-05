import React from 'react';
import { Link } from 'react-router-dom';
import './page.css';

export const Page = ({ page }) => {
	return (
		<div
			className='page'
			id={page._id}
			style={{ backgroundImage: `url(${page.imgUrl})` }}
		>
			<div className='page-grid'>
				<div className='text-wrapper'>
					<h2>{page.subHeading}</h2>
					<h1>{page.heading}</h1>
					<p>{page.body}</p>
					<button className='anchor-wrapper' disabled={page.isDisabled}>
						<Link to={page.link}>{page.anchor}</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

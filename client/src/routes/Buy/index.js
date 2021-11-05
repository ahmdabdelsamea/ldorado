import React from 'react';

import { Page, Footer } from '../../components';
// import { BuyCard, Page, Footer } from '../../components';
import soon from '../../data/soon';

const Buy = () => {
	return (
		<>
			<div className='home'>
				{soon.map((soon) => (
					<div key={soon._id}>
						<Page page={soon} />
					</div>
				))}
			</div>
			<Footer />
		</>
	);
};

export default Buy;

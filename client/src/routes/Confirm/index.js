import React from 'react';
import { Link } from 'react-router-dom';

import './confirm.css';

const Cart = () => {
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	return (
		<div className='cart-scroll'>
			<div className='cart-page'>
				<div className='cart-wallet'>
					<h2>Name</h2>
					<h3>USD {addDecimals(Number((50).toFixed(2)))}</h3>

					<Link className='add-funds' to='/add-funds'>
						+ Add Funds
					</Link>
				</div>
				<div className='confirm-investments'>
					<h2>Confirm Investment</h2>

					<button>Invest</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;

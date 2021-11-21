import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { Failure, Loading } from '../../components';
import '../form.css';

const Funds = ({ history }) => {
	const [balance, setBalance] = useState(1);

	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const addFundsHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const authToken = localStorage.getItem('authToken');

		// prettier-ignore
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		};

		const { data } = await axios.post(
			'/create-payment-intent',
			{ dollars: balance },
			config
		);

		const { error, paymentIntent } = await stripe.confirmCardPayment(
			data.client_secret,
			{
				payment_method: { card: elements.getElement(CardElement) },
			}
		);

		if (error) {
			setMessage(error.message);
		} else {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					history.push('/dashboard');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		}

		setIsLoading(false);
	};

	const inputStyle = {
		iconColor: '#c4f0ff',
		color: '#ff0',
		fontWeight: '500',
		fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
		fontSize: '16px',
		fontSmoothing: 'antialiased',
		':-webkit-autofill': {
			color: '#fce883',
		},
		'::placeholder': {
			color: '#87BBFD',
		},
	};

	return (
		<div className='form-page'>
			{isLoading && <Loading />}
			{message && <Failure failure={message} />}
			<div className='form-container'>
				<div className='router-wrapper'>
					<h1>ADD FUNDS</h1>
				</div>
				<form id='payment-form' className='form-grid' onSubmit={addFundsHandler}>
					<label htmlFor='balance'>Balance in USD</label>
					<input
						type='number'
						id='balance'
						name='balance'
						min='1'
						onChange={(e) => setBalance(e.target.value)}
					/>

					<div className='two-columns'>
						<CardElement
							id='payment-element'
							options={{
								style: {
									base: inputStyle,
								},
							}}
						/>
					</div>

					<div className='two-columns'>
						<button
							id='submit'
							type='submit'
							className='create-btn'
							disabled={isLoading || !stripe || !elements}
						>
							+ Add Funds
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withRouter(Funds);

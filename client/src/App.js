import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Routes from './routes';

//Components
import { Header } from './components';
import ScrollToTop from './components/ScrollToTop';
import { getPublishableKey } from './utils/getPublishableKey';

function App() {
	// const [publicKey, setPublicKey] = useState('');

	// useEffect(() => {
	// 	const fetchPublishableKey = async () => {
	// 		const { publishableKey } = await getPublishableKey();
	// 		setPublicKey(publishableKey);
	// 	};

	// 	fetchPublishableKey();
	// 	console.log(publicKey);
	// }, []);

	const stripePromise = loadStripe(
		'pk_test_51JJ6OZJdm6JCfVPgRAO3RuwoktkJxyE3eDxppmTQZoHyr8UKenIgsqtqn0s9YqJrKoiHn6s59pRpRyUK5TpKoJTF00bWsUtY2Z'
	);

	return (
		<div>
			<Router>
				<Elements stripe={stripePromise}>
					<ScrollToTop />
					<Header />
					<Routes />
				</Elements>
			</Router>
		</div>
	);
}

export default App;

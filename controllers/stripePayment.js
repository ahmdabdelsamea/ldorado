const { CLIENT_DOMAIN, STRIPE_SECRET_KEY, FUND_PRICE, STRIPE_WEBHOOK_SECRET } =
	process.env;

import { User, Payment } from '../models/index.js';
import { catchError } from '../middleware/index.js';

import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY);
// const endpointSecret = STRIPE_WEBHOOK_SECRET;

export const stripePayment = catchError(async (req, res, next) => {
	const { funds } = req.body;
	const customerId = req.user._id;

	const { email } = await User.findById(customerId);

	const { id } = await stripe.customers.create({
		email: email,
	});

	const newUser = await User.findOneAndUpdate(
		{ _id: customerId },
		{ $set: { stripeId: id } },
		{ new: true }
	);

	const session = await stripe.checkout.sessions.create({
		customer_email: email,
		payment_method_types: ['card'],
		line_items: [
			{
				price: FUND_PRICE,
				quantity: funds,
			},
		],

		phone_number_collection: {
			enabled: true,
		},
		mode: 'payment',
		success_url: `${CLIENT_DOMAIN}/dashboard`,
		cancel_url: `${CLIENT_DOMAIN}/dashboard`,
	});

	const sessionPaymentIntent = session.payment_intent;
	const paymentStatus = session.payment_status;

	const createSession = await Payment.create({
		sessionPaymentIntent,
		paymentStatus,
	});

	res.json({ sessionUrl: session.url });

	console.log(session);
});

// export const stripeWebhook = catchError(async (req, res, next) => {
// 	const event = req.body;

// 	switch (event.type) {
// 		case 'payment_intent.succeeded':
// 			const paymentIntent = event.data.object;
// 			console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

// 			handlePaymentIntentSucceeded(paymentIntent);
// 			break;
// 		default:
// 			console.log(`Unhandled event type ${event.type}.`);
// 	}

// 	res.status(200).json({ received: true });
// });

// const handlePaymentIntentSucceeded = catchError(async (paymentIntent) => {
// 	console.log(paymentIntent.id);
// });

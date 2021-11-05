import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
	{
		sessionPaymentIntent: {
			type: String,
			required: true,
		},
		paymentStatus: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Payment = mongoose.model('Payment', paymentSchema);

import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
	{
		investBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		investTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		investIn: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Property',
		},
		investedQty: {
			type: Number,
			required: true,
		},
		investedMoney: {
			type: Number,
			required: true,
		},
		ownedShares: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Investment = mongoose.model('Investment', investmentSchema);

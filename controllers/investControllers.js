import { catchError } from '../middleware/index.js';
import { Property, Investment, User } from '../models/index.js';

export const investController = catchError(async (req, res, next) => {
	const property = await Property.find({});
	res.status(200).json(property);
});

export const getPropertyById = catchError(async (req, res, next) => {
	const id = req.params.id;

	const property = await Property.findById(id);

	if (property) {
		res.json(property);
	} else {
		res.status(404);
		throw new Error(`Property Not Found`);
	}
});

export const buyShares = catchError(async (req, res, next) => {
	const id = req.params.id;
	const investorId = req.user._id;
	const { shares } = req.body;

	if (id && investorId && shares) {
		const { createdById, noSharesLeft, sharePrice } = await Property.findById(
			id
		);
		if (createdById && noSharesLeft && sharePrice) {
			const totalInvestment = sharePrice * shares;
			const newSharesLeft = noSharesLeft - shares;

			const { wallet } = await User.findById(investorId);

			if (wallet < totalInvestment) {
				res
					.status(400)
					.json({ message: 'Wallet has not enough money: Add Funds' });
			} else {
				const investmentExists = await Investment.findOne({
					investIn: id,
					investBy: investorId,
				});

				if (investmentExists) {
					const { _id, ownedShares } = investmentExists;
					const newOwnedShares = ownedShares + shares;

					const newInvestment = await Investment.findOneAndUpdate(
						{ _id: _id },
						{ $set: { ownedShares: newOwnedShares } },
						{ new: true }
					);

					const { noSharesLeft } = await Property.findOneAndUpdate(
						{ _id: id },
						{ $set: { noSharesLeft: newSharesLeft } },
						{ new: true }
					);

					const newProperty = await Property.findOneAndUpdate(
						{ _id: id },
						{ $push: { investments: newInvestment } },
						{ new: true }
					);

					const newInvestorInvestment = await User.findOneAndUpdate(
						{ _id: investorId },
						{ $push: { investments: newInvestment } },
						{ new: true }
					);

					const newInvestorWallet = wallet - totalInvestment;

					const newInvestor = await User.findOneAndUpdate(
						{ _id: investorId },
						{ $set: { wallet: newInvestorWallet } },
						{ new: true }
					);

					const newSeller = await User.findOneAndUpdate(
						{ _id: createdById },
						{ $push: { purchases: newInvestment } },
						{ new: true }
					);

					res.status(200).json({
						newInvestment,
						// newProperty,
						// newInvestor,
						// newSeller,
					});
				} else {
					const newInvestment = await Investment.create({
						investBy: investorId,
						investTo: createdById,
						investIn: id,
						investedQty: shares,
						investedMoney: totalInvestment,
						ownedShares: shares,
					});

					const { noSharesLeft } = await Property.findOneAndUpdate(
						{ _id: id },
						{ $set: { noSharesLeft: newSharesLeft } },
						{ new: true }
					);

					const newProperty = await Property.findOneAndUpdate(
						{ _id: id },
						{ $push: { investments: newInvestment } },
						{ new: true }
					);

					const newInvestorInvestment = await User.findOneAndUpdate(
						{ _id: investorId },
						{ $push: { investments: newInvestment } },
						{ new: true }
					);

					const newInvestorWallet = wallet - totalInvestment;

					const newInvestor = await User.findOneAndUpdate(
						{ _id: investorId },
						{ $set: { wallet: newInvestorWallet } },
						{ new: true }
					);

					const newSeller = await User.findOneAndUpdate(
						{ _id: createdById },
						{ $push: { purchases: newInvestment } },
						{ new: true }
					);

					res.status(200).json({
						newInvestment,
						// newProperty,
						// newInvestor,
						// newSeller,
					});
				}
			}
		} else {
			res.status(400);
			throw new Error(`Something Went Wrong!`);
		}
	} else {
		res.status(404);
		throw new Error(`Not Found`);
	}
});

import { catchError } from '../middleware/index.js';
import { User, Property, Investment } from '../models/index.js';

export const dashboardController = catchError(async (req, res, next) => {
	const id = req.user._id;

	const { _id, firstName, lastName, wallet, investments } = await User.findById(
		id
	);
	const listedProperties = await Property.find({ createdById: _id });

	if (investments) {
		// const investmentsList = await Investment.find({
		// 	_id: { $in: investments },
		// });

		const investedInProperties = await Property.find({
			investments: { $in: investments },
		});

		res.status(200).json({
			firstName,
			lastName,
			wallet,
			investedInProperties,
			listedProperties,
		});
	} else {
		res.status(404);
		throw new Error(`Not Found`);
	}
});

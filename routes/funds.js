import express from 'express';
import bodyParser from 'body-parser';

import { protect } from '../middleware/index.js';
import {
	getPublicKey,
	stripeAddFunds,
	stripeWebhook,
} from '../controllers/index.js';

const router = express.Router();

router.route('/stripe-public-key').get(getPublicKey);
router.route('/create-payment-intent').post(protect, stripeAddFunds);
router.post(
	'/webhook',
	bodyParser.raw({ type: 'application/json' }),
	stripeWebhook
);

export default router;

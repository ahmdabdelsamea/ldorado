import express from 'express';

import { protect } from '../middleware/index.js';
import { stripePayment } from '../controllers/index.js';
// import { stripeWebhook } from '../controllers/index.js';

const router = express.Router();

router.route('/create-checkout-session').post(protect, stripePayment);
// router
// 	.route('/webhook')
// 	.post(express.json({ type: 'application/json' }), stripeWebhook);

export default router;

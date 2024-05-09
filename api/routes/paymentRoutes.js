import express from "express";
// import { verifyToken } from '../utils/verifyUser.js'
import { buySubscription,getRazorPayKey,paymentVerification } from "../controller/payment.controller.js";
const router=express.Router();

//Buy subscription

// router.post('/subscribe/:id',verifyToken,buySubscription);
router.get('/razorpaykey',getRazorPayKey);
// router.get('/razorpaykey',verifyToken,getRazorPayKey);

// router.post('/paymentverification/:id',verifyToken,paymentVerification);
// // router.delete('/subscribe/cancel/:id',verifyToken,cancelSubscription);


// router.route("/subscribe").post(buySubscription);

router.post('/subscribe',buySubscription);
// router.post('/subbutton',subbutton);

router.route("/paymentverification/:id").post(paymentVerification);
export default router;
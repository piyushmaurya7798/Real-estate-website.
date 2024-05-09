// import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.js";
// import User from "../models/user.js";
import instance from "../server.js";
// import { errorHandler } from "../utils/error.js";
import crypto from "crypto";
// export const buySubscription=catchAsyncError(async(req,res,next)=>{

//     const user=await User.findById(req.params.id);

//     if (user.isAdmin===true) return next(errorHandler(400,"admin can't by subscription"));
//     // return next(errorHandler(401,'You can only view your own listings!'))
//     // const plan_id=process.env.PLAN_ID;
//     const plan_id=process.env.PLAN_ID||"plan_NngrfGwkb3espi";
//     const subscription = await instance.subscriptions.create({
//         plan_id,
//         customer_notify:1,
//         total_count:12,
//     })
//         user.subscription.id=subscription.id;
//         user.subscription.status=subscription.status;
//         user.subscription.short_url=subscription.short_url;
//         // user.status=subscription.status;

//         await user.save();
//          res.status(201).json({success:true,subscriptionId:subscription.id,subscription_short_url:subscription.short_url})
//         //  req.redirect(subscription.short_url);
//         //  console.log(subscription);
// });
export const buySubscription = async (req, res, next) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
  };
  console.log(req.body);
  const order = await instance.orders.create(options);
  const user_id = req.body.user._id;

  await Order.create({
    order_id: order.id,
    status: order.status,
    user_id: user_id,
  });

  console.log(user_id);
  res.status(200).json({
    success: true,
    order,
    user_id,
  });
};

//   export const paymentVerification=async(req,res,next)=>{
//   const {razorpay_signature,razorpay_subscription_id,razorpay_payment_id}= req.body;
// const user=await User.findById(req.params.id);
//     // const subscription_id=user.subscription.id;
//     // const generated_signature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(razorpay_payment_id+"|"+subscription_id,"utf-8").digest("hex")
//     const body_data=razorpay_payment_id+"|"+razorpay_subscription_id;
//   const expect=  crypto.createHmac('sha256','3oX1Dvxlpy2wB3BGnDPxGtH8')
//     .update(body_data).digest("hex")
//     const isValid=expect===razorpay_signature;
//     // const isAuthentic=generated_signature===razorpay_signature;

//     if(!isValid) return res.redirect("http://localhost:5173/paymentfail");
//     // if(!isAuthentic) return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

//     await Payment.create({razorpay_signature,razorpay_subscription_id,razorpay_payment_id})

//     user.subscription.status="active";
//     // user.status="active";
//     await user.save();

//     res.redirect(`http://localhost:5173/paymentsuccess?payment_id=${razorpay_payment_id}`);
// }

export const paymentVerification = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  // console.log("body ", req.body);
  const expectedSignature = crypto
    .createHmac("sha256", "3oX1Dvxlpy2wB3BGnDPxGtH8")
    // process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  //var id=user.id;
  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    const order = await Order.findOneAndUpdate(
      {
        order_id: razorpay_order_id,
      },
      // {user_id: req.params.id},
      { status: "active" },
      // { new: true }
    );
    // const user=await User.findByIdAndUpdate(
    //   {_id:}
    // )
    // console.log(req.params.id)
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      // {user_id: },
      { status: "active" },
      // { new: true }
    );
    // console.log(req.currentUser._id)
    await order.save();
    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
export const getRazorPayKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: "rzp_test_4DrJJevYZkd0No",
    // process.env.RAZORPAY_API_KEY,
  });
};
// export const subbutton = async (req, res, next) => {
//   const order = await Order.findOne(req.body)
// };


// export const cancelSubscription=catchAsyncError(async(req,res,next)=>{
//     // const user=await User.findById(req.params.id);
//     const user=await User.findById(req.user._id)

//     const subscriptionId=user.subscription.id;
//     let refund=false;

//     await instance.subscriptions.cancel(subscriptionId);

//     const payment=await Payment.findOne({
//         razorpay_subscription_id:subscriptionId,
//     })

//     const gap=Date.now()-payment.createdAt;
//     const refundTime=process.env.REFUND_DAYS*24*60*60*1000;

//     if (refundTime>gap) {
//             await instance.payments.refund(payment.razorpay_payment_id);
//             refund=true;
//     }
//     await payment.remove();
//     user.subscription.id=undefined
//     user.subscription.status=undefined
//     // user.status=undefined
//     await user.save();
//     res.status(200).json({
//         success:true,
//         message:
//         refund?"Subscription Cancelled , You will receive full refund with in 7 days.":"No refund initiated as subscription was canceled after 7 days."
//     })

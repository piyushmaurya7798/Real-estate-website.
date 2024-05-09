// import mongoose from "mongoose";
 
// const schema=new mongoose.Schema(
//     {
//         id:{
//             type:Number,
//             required:true,
//         },
//         razorpay_signature:{
//             type:String,
//             required:true,
//         },
//         razorpay_subscription_id:{
//             type:String,
//             required:true,
//         },
//         razorpay_payment_id:{
//             type:String,
//             required:true,
//         },
//         createdAt:{
//             type:Date,
//             default:Date.now,
//         },
//     },{timestamps:true}
// )

// const Payment=mongoose.model('Payment',schema);


// export default Payment;


import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;


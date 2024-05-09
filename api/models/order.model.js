

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
 status: {
    type: String,
    required: true,
  },
  user_id:{
    type:String,
  }
});
const Order = mongoose.model("Order", orderSchema);

export default Order;


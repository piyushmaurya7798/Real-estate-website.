import Order from "../../models/order.model.js";
import User from "../../models/user.js";
// import { errorHandler } from "../utils/error.js";

// export const deleteUser=async (req,res,next)=>{
//     try {
//       await Listing.findByIdAndDelete(req.params.id);
//       res.status(200).json('Listing has been deleted!')
//       } 
//     catch (error) {
//         next(error);
//     }}



    export const getUsers = async (req, res,next) => {
      try{
      const limit =100;
      const startIndex =0;


      const sort ='createdAt';
  
      const order ='desc';
      // console.log("Hello")
//       const totalUsers = User.allUsers().length;
// console.log("Total users: ", totalUsers);
      const users = await User.find()
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
      
      console.log(users.length);

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
    export const getActive = async (req, res,next) => {
      try{
      const limit =100;
      const startIndex =0;


      const sort ='createdAt';
  
      const order2 ='desc';
      // console.log("Hello")
//       const totalUsers = User.allUsers().length;
// console.log("Total users: ", totalUsers);
      const order = await Order.find()
      .sort({ [sort]: order2 })
      .limit(limit)
      .skip(startIndex);
      
      console.log(order.length);

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};



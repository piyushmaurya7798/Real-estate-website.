// import User from '../models/user.js';
// import { errorHandler } from '../utils/error.js';

// export const authorizeSubscribers=async(req,res,next)=>{
//     const user=await User.findById(req.user.id);
//     console.log(user.subscription);
//     if(user.subscription.status !== "active" && req.user.isAdmin !=="true"){
//         return next(errorHandler(400,"only subscriber can list their property"));
//     }
//     next();
   
// }

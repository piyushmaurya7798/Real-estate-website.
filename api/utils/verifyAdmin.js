import User from "../models/user.js";
import { errorHandler } from "./error.js";

export const verifyAdmin=async(req,res,next)=>{
try {
    console.log("verify Admin called ",req.params.id);
    const user = await User.findById(req.params.id);
        // const user=req.params.id;

        console.log(user);
        if(!user.isAdmin) return next(errorHandler(401,'Unauthorized'));
    
} catch (error) {
    return next(errorHandler(401,'Something went wrong'));
}
// req.user=user;
return next();
    // })
}
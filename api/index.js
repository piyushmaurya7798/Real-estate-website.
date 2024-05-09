import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import payment from './routes/paymentRoutes.js'
import adminRouter from './routes/admin.route.js'
import wishlistRouter from './routes/wishlist.route.js'
import cors from "cors";
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{console.log("Connected to MongoDB!")}).catch((err)=>{console.log(err)})
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.listen(3000,()=>{
    console.log('Server is running  on port 3000')
})
 

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);
app.use('/api/payment',payment);
app.use('/api/admin',adminRouter);
app.use('/api/wishlist',wishlistRouter);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.get("/getkey", (req, res) =>
  res.status(200).json({ key: "rzp_test_4DrJJevYZkd0No"})
);
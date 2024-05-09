import express from "express";
import { AddToWishlist,getWishlist } from "../controller/wishlist.controller.js";
const router=express.Router();

router.post("/addtowishlist/:id",AddToWishlist);
router.get("/getwishlist/:id",getWishlist);

export default router;
import Wishlist from "../models/wishlist.model.js";
import Listing from "../models/listing.model.js";

export const AddToWishlist = async (req, res, next) => {
  try {
    // console.log("From request" );
    // console.log(req.body.currentUserid);
    const wishlist = await Wishlist.create({
      user_id: req.body.currentUserid,
      product_id: req.body.listingid,
    });

    return res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
  //   console.log("getWishlist----------------------");
    var userid = req.params.id;
    const wish = await Wishlist.find({ user_id: userid });

  //   // console.log(wish[1].product_id)
    var list={};
    var i = 0;
    // wish.forEach(async element => {
    // console.log(element.product_id)
   var  i =await wish.map(async (wi) => {
      // console.log(wi)
      list=await Listing.findById(wi.product_id);
      return(list)
      // console.log(list);
    });
    // i++;
    // console.log(i);
    // console.log( Listing.find({_id:element.product_id}))
  //   }
  // );

    console.log("list----------------",list)

    // console.log(i)
    // var wish=await Wishlist.aggregate([{
    //   $lookup: {
    //   from: 'Listing',
    //   localField: 'product_id',
    //   foreignField: '_id',
    //   as: 'WishList_Item'
    //   }}]);
    // console.log(wish);
    // var list=[];
    // var i=0
    // wish.forEach(wi => {

    //    list[i] = Listing.find({_id:wi.product_id});
    //    i++;
    // });
    // const list = await Listing.find({_id:wish[1].product_id});

    // console.log(list);
    // if (!wish) {
    //   return next(errorHandler(404, 'Listing not found!'));
    // }
    res.status(200).json(wish);
    // res.status(200).json(list2);
  } catch (error) {
    next(error);
  }
};

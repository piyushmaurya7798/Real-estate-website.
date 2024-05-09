import express from 'express';
import { createListing,deleteListing,updateListing,getListing,getListings} from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { getActive, getUsers} from '../controller/Admin/admin.controller.js'
// import { authorizeSubscribers } from '../middleware/auth.js';
const router=express.Router();

router.post('/create',verifyToken,createListing);
// ,authorizeSubscribers
router.delete('/delete2/:id',verifyToken,verifyAdmin,deleteListing);
// router.post('/update',verifyToken,verifyAdmin,updateListing);
// router.get('/get/:id',verifyAdmin,getListing);
// router.get('/admin/get',verifyAdmin, getListings);
router.get('/getUser2/:id',verifyAdmin, getUsers);
router.get('/getActive/:id',verifyAdmin, getActive);
// router.get('/getUsers2', getUsers);


export default router;
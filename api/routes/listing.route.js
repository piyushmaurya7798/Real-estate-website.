import express from 'express';
import { createListing,deleteListing,updateListing,getListing,getListings, getActiveUser} from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
// import { authorizeSubscribers } from '../middleware/auth.js';
const router=express.Router();

router.post('/create',verifyToken,createListing);
// ,authorizeSubscribers

router.delete('/delete/:id',verifyToken,deleteListing);
router.delete('/delete',verifyToken,verifyAdmin);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getListing);
router.get('/get', getListings);
router.get('/get/active/:id', getActiveUser);

export default router;
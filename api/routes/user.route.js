import express from 'express'
import { test, updateUser ,deleteUser,getUserListings,getUser,signout,getUsers, getUsersx} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router=express.Router();

router.get('/test',test) 
router.post('/update/:id',verifyToken,updateUser) 
router.delete('/delete/:id',verifyToken,deleteUser)  
router.get('/listing/:id',verifyToken,getUserListings)
router.get('/:id', verifyToken, getUser)
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
// router.get('/geet', verifyToken,getUsersx);
export default router;
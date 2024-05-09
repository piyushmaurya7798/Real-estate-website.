import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux"

export default function Adminuser(user) {
    const [active, setActive] = useState()
    const {currentUser}=useSelector((state)=>state.user)
    // console.log(user.user._id)
    useEffect(() => {
      const activeuser=async()=>{
        setActive(false)
      const res = await fetch(`/api/listing/get/active/${user.user._id}`);
      const data = await res.json();
      // console.log(data[0].status);
      // if (data.status) {
        // console.log(data);
     data.forEach(element => {
      // console.log(element)
      if (element.status==="active") {
        setActive(true)
      }
      // setActive(false)
    }); 
   
      }
      activeuser();
    }, []);
    // console.log(active);
  return (
    <div className='md:mx-auto p-3 border rounded-lg ' style={{width:'25.333333%', alignItems:'center'}}>
    <div  style={{ textAlign:'center'}}>
  
   <div style={{display: 'block',margin:'auto',width: '25%'}}>
    <img style={{ }}
      src={
        user.user.avatar||
        'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
      }
      alt='User cover'
      className='h-[15px] sm:h-[50px] w-[50px] object-cover hover:scale-105 transition-scale duration-300'
    />
    </div>
    <div className='p-3 flex flex-col gap-2 w-full'>
        <div className='text-slate-700 truncate text-lg font-semibold'>UserID : {user.user._id}</div>
        Username: {user.user.username}
      <p className='text-slate-500 mt-2 font-semibold '>
        <div className='text-slate-700 truncate text-lg font-semibold'>Status :{active ? " Active":" not active"} </div>
        
        {/* <div>{console.log(active)} </div> */}
        {/* {user.user.subscription.status}</div> */}
       
      </p>
      {/* <div className="flex flex-col items-center"> */}
  {/* <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button> */}
{/* </div> */}
    </div>
  {/* <Link to={`/update-listing/${listing._id}`}>
   <button className="text-green-700 uppercase">Edit</button>
  </Link> */}
  </div>
</div>
);
}



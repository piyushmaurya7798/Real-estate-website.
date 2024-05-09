import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
export default function AdminListingItem({ listing }) {
    const [userListings, setUserListings] = useState([])
  const {currentUser}=useSelector((state)=>state.user)
  // const handleListingDelete=async(listingId)=>{
  //   try {
  //     const res =await fetch(`/api/listing/delete/${listingId}`,{
  //       method:'DELETE',
  //     })
  //     const data=await res.json();
  //     if(data.success ===false){
  //       console.log(data.message);
  //       console.log(listingId);
  //       return;
  //     }
  //     setUserListings((prev)=>prev.filter((listing)=>listing._id !== listingId));
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   } 
const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
      // setShowModal(true)
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div className='md:mx-auto p-3 border rounded-lg ' style={{width:'25.333333%', alignItems:'center'}}>
        <div  style={{ textAlign:'center'}}>
      <Link to={`/listing/${listing._id}`}>
       <div style={{display: 'block',margin:'auto',width: '25%'}}>
        <img style={{ }}
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[15px] sm:h-[50px] w-[50px] object-cover hover:scale-105 transition-scale duration-300'
        />
        </div>
        <div className='p-3 flex flex-col gap-2 w-full'>
            <div className='text-slate-700 truncate text-lg font-semibold'>UserID : {listing.userRef}</div>
            {listing.name}
          <p className='text-slate-500 mt-2 font-semibold '>
            ${listing.offer
              ? listing.discountedPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex flex-col items-center">
    </div>
        </div>
      </Link>
      <Link to={`/update-listing/${listing._id}`}>
       <button className="text-green-700 uppercase">Edit</button>
      </Link>
      </div>
      <button style={{marginLeft:"7.7vw"}} onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
    </div>
  );
}
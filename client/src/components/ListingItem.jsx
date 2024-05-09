import { Link } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux"
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
export default function ListingItem({ listing }) {
  const { currentUser } = useSelector((state) => state.user)


  const AddWishList = async () => {
    try {
      // console.log(currentUser._id);
      // console.log(listing._id);
      var listingid = listing._id;
      var currentUserid = currentUser._id;

      const res = await fetch(`/api/wishlist/addtowishlist/${currentUserid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingid, currentUserid }),
      })
      const data = await res.json();
      // console.log(data);

    }
    catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div  className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>

            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>

          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            &#8377;
            {listing.offer
              ? listing.discountedPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedRooms > 1
                ? `${listing.bedRooms} beds `
                : `${listing.bedRooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathRooms > 1
                ? `${listing.bathRooms} baths `
                : `${listing.bathRooms} bath `}

            </div>
          </div>


        </div>
      </Link>
      {/* <button onClick={AddWishList}>Like</button> */}
      <AiFillLike  style={{position:"relative", left:"300px" ,bottom:"380px", cursor:"pointer"}} size="20" color='white' onClick={AddWishList}/>
    </div>
  );
}
import React, { useEffect, useState } from 'react'
import ListingItem from '../components/ListingItem'
import { useSelector } from 'react-redux'

function WishList() {
  const { currentUser } = useSelector((state) => state.user)
  const [listing, setListing] = useState([])
  let loading = false;
  useEffect(async() => {
    const res = await fetch(`/api/wishlist/getwishlist/${currentUser._id}`)
    const data = await res.json();
    console.log(data);
    setListing(data);  
    }, []);
    console.log(listing);
  
  // fetchWishlist();
  return (
    <div>
      {!loading &&
        listing &&
        listing.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}

      {/* <ListingItem onload={as} key={listing._id} listing={listing} /> */}
    </div>
  )
}

export default WishList
import { useEffect, useState } from 'react';
import Adminuser from '../components/Admin-user';
import { useSelector } from 'react-redux';
// import { configDotenv } from 'dotenv';

function Search() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState([]);

  const [showMore, setShowMore] = useState(false);
  
  const { currentUser} = useSelector((state) => state.user);
 

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
  
    const fetchUsers = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/admin/getUser2/${currentUser._id}?${searchQuery}`);
      const res2 = await fetch(`/api/admin/getActive/${currentUser._id}?${searchQuery}`);
      const data = await res.json();
      const data2 = await res2.json();
    //   if (data.length >8) {
    //     setShowMore(true);
    //   } else {
    //     setShowMore(false);
    //   }
      setUsers(data);
      setActive(data2);
      setLoading(false);
    };

    fetchUsers();
}
  , [location.search]);
//   ,);
var count=0;
users.forEach(user => {
  if ( user?.subscription?.status==="active") {
    count++;
  }
  
});
var count2=0;
active.forEach(active => {
  if ( active?.status==="active") {
    count2++;
  }
  
});
// console.log(count2 , "Count@---------------------------------------")
 
  const onShowMoreClick = async () => {
    const numberOfUsers = users.length;
    const startIndex = numberOfUsers;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/admin/getUser2/${currentUser._id}?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setUsers([...users, ...data]);
  }
  
 
  return (
    <>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Users :</h1>
    
    <div style={{marginLeft:"100px", padding:" 20px 20px", display:"flex", }}>
     <div>Number of users
      <div style={{height:"100px" , width:"100px", fontSize:"50px",paddingLeft:"35px"}}>{users.length}</div>
      </div> {/* <div style={{marginLeft:"100px", padding:" 20px 20px"}}> */}
     <div style={{height:"100px" ,paddingLeft:"35px"}}>Number of Active users
      <div style={{height:"100px" , width:"100px", fontSize:"50px",paddingLeft:"70px"}}>{count2}</div>
      </div></div>
      {/* </div> */}
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && users.length === 0 && (
            <p className='text-xl text-slate-700'>No User found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            users &&
            users.map((user) => (
              <Adminuser key={user._id} user={user} length={users.length}/>

            ))}
             {/* {showMore && (
            // <button
            //   onClick={onShowMoreClick}
            //   className='text-green-700 hover:underline p-7 text-center w-full'
            // >
            //   Show more
            // </button>
          )} */}
        </div>
      </div>
      </>
  );
}
export default Search;
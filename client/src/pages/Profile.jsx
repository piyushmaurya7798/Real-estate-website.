import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useRef, useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice.js';
import { signOutUserSuccess } from '../redux/user/userSlice.js';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Subscribe from "../components/Payments/Subscribe.jsx";
function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user)
  //   const [file, setFile] = useState(undefined)
  //   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  //     const [imageFileUploadError, setImageFileUploadError] = useState(null);
  //     const [imageFileUploading, setImageFileUploading] = useState(false);
  //     const [imageFileUrl, setImageFileUrl] = useState(null);
  //   const [filePerc, setFilePerc] = useState(0)
  //   // const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  //   const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([])
  const [disable, setDisable] = useState();
  // const dispatch=useDispatch();
  // const handleImageChange = (e) => {
  //   const files = e.target.files[0];
  //   if (files) {
  //     setFile(file);
  //     setImageFileUrl(URL.createObjectURL(files));
  //   }
  // };
  //   useEffect(() => {
  //     if(file){
  //       handleFileUpload(file);
  //     } 
  //   }, [file])

  //   const handleFileUpload=(file)=>{
  //     setImageFileUploading(true);
  //     setImageFileUploadError(null);
  //     const storage=getStorage(app);
  //     const fileName=new Date().getTime()+file.name;
  //     const storageRef=ref(storage,fileName)
  //     const uploadTask=uploadBytesResumable(storageRef,file)

  //     uploadTask.on('state_changed',
  //     (snapshot)=>{
  //       const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  //       setFilePerc(Math.round(progress));
  //     },
  //     (error)=>{
  //       setFileError(true);
  //       setImageFileUploadProgress(null);
  //       setFile(null);
  //       setImageFileUrl(null);
  //       setImageFileUploading(false);
  //     },
  //     ()=>{
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
  //         setImageFileUrl(downloadURL);
  //         setFormData({...formData,avatar:downloadURL})
  //         setImageFileUploading(false);}
  //       )
  //     })
  //   }

  //   const handleChange=(e)=>{
  //     setFormData({...formData,[e.target.id]:e.target.value});
  //   };

  //   const handleSubmit=async(e)=>{
  //     e.preventDefault();
  //     setShowListingsError(null);
  //     setUpdateSuccess(null);
  //     if (Object.keys(formData).length === 0) {
  //       setShowListingsError('No changes made');
  //       return;
  //     }
  //     if (imageFileUploading) {
  //       setShowListingsError('Please wait for image to upload');
  //       return;
  //     }
  //     try {
  //       dispatch(updateUserStart());
  //       const res=await fetch(`/api/user/update/${currentUser._id}`,{
  //         method:'POST',
  //         headers:{
  //           'Content-Type':'application/json',
  //         },
  //         body:JSON.stringify(formData),

  //       })
  //       const data =await res.json();
  //       if(data.success === false){
  //         dispatch(updateUserFailure(data.message));
  //         setShowListingsError(data.message);
  //         return;
  //       }
  //       dispatch(updateUserSuccess(data));
  //       setUpdateSuccess(true);
  //     } catch (error) {
  //       dispatch(updateUserFailure(error.message));
  //       setShowListingsError(error.message);
  //     }
  //   }
  // const { currentUser,error,loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  // const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  useEffect(() => {
    const activeuser=async()=>{
    const res = await fetch(`/api/listing/get/active/${currentUser._id}`);
    const data = await res.json();
    // console.log(data[0].status);
    // if (data.status) {
    if (data[0].status === "active") {

      setActive(true)
    }
    }
    activeuser();
  }, []);
  // console.log(active)

  // useEffect(async() => {

  //   const res=await fetch(`/api/payment/subbutton`,{
  //     method:'POST',
  //     headers:{
  //         'Content-Type':'application/json',
  //     },
  //     body:JSON.stringify({
  //     user:currentUser._id,}), 
  // });
  // }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateUserError(error.message);
    }
  };


  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }


  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }
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

  // const handledisable=()=>{
  //     if(currentUser.subscription.status==="active"){
  //       setDisable(true);
  //     }
  //     setDisable(false);
  // }
  // console.log(currentUser.subscription)
  return (
    <div className="p-3 max-w-lg mx-auto">

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input onChange={(e)=>setFile(e.target.files[0])}type="file" ref={fileRef} hidden accept="image/*"/>
<img onClick={()=>fileRef.current.click()}src={formData.avatar|| currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
<p className="text-sm self-center">{fileUploadError?(
        <span className="text-red-700">Error Image upload (Image must be 2 mb or less)</span>):
        filePerc>0 && filePerc<100?(<span className="text-slate-700">{`Uploading ${filePerc}%`}</span>):
        filePerc ===100?(<span className="text-green-700">Image successfully uploaded!</span>):("")}</p> */}

        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => fileRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                    })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.avatar}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
              }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <input type="text" defaultValue={currentUser.username} onChange={handleChange} placeholder="Username" id='username' className="border p-3 rounded-lg" />
        <input type="email" defaultValue={currentUser.email} onChange={handleChange} placeholder="Email" id='email' className="border p-3 rounded-lg" />
        <input type="password" placeholder="Password" id='password' onChange={handleChange} className="border p-3 rounded-lg" />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : 'Update'}</button>
        {/* {disable&& */}

        {active &&<Link to={"/create-listing"} className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 " >Create Listing</Link>}
        {active ?<div className="text-green-700 uppercase">Subscription Already Active</div>: <Link to={'/subscribe'}> <button className="text-red-700 uppercase">Buy Subscription to list your own property</button></Link>}

      </form>
      <div className="flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="text-red-700 cursor-pointer">Delete account</span>
        {currentUser.isAdmin && <Link to={'/dashboard?tab=profile'} className="text-red-700 cursor-pointer"><button>Show Dashboard</button></Link>}
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated successfully!' : ""}</p>
      <button onClick={handleShowListings} className="text-green-700 w-full ">Show Listings</button>
      <p className="text-red-700 text-sm mt-5">{showListingsError ? 'Error showing listings' : ''}</p>

      {userListings && userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing) =>
            <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain rounded-lg" />
              </Link>
              <Link className=' flex-1 text-slate-700 font-semibold hover:underline truncate' to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button onClick={() => handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          )}</div>}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4 pb-3'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Profile

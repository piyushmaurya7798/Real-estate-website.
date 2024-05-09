import {FaSearch} from 'react-icons/fa'
import { Link , useNavigate} from 'react-router-dom'
import { useEffect,useState } from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserSuccess } from '../redux/user/userSlice';
// import { toggleTheme } from './redux/theme/theme.slice';
import {Dropdown,Button,Avatar} from 'flowbite-react';
function Header() {
  const {currentUser}=useSelector(state=>state.user)
  
  const [showSignOut, setsShowSignOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  // const { theme } = useSelector((state)=> state.theme);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
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
  const handleSignOutButton=()=>{
    setsShowSignOut(true);
  }
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
<Link to="/">   
     <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
        <span className='text-slate-500'>Real</span>
        <span className='text-slate-900'>Estate</span>
        </h1></Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
            <input type="text" placeholder='Search...' className='bg-transparent focus:ring-0 border-none h-[24px] w-24 sm:w-64' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
           <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
        <Link to="/">      <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
        <Link to="/about">   <li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
        <Link to="/profile "> 
       {currentUser?(
        <img
        onClick={handleSignOutButton}
        className='rounded-full h-7 w-7 object-cover'
        src={currentUser.avatar}
        alt='profile'
      />
       ):  ( <li className='hover:underline' >Sign In</li>  )
      }
      </Link>
      {/* <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button> */}
       {showSignOut && <Link><li  onClick={handleSignout}>Sign Out</li></Link>}
        </ul>
      
        </div>
    </header>

  )
}

export default Header
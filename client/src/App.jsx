import { BrowserRouter, Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
// import { ChakraProvider } from '@chakra-ui/react'

import CreateListing from "./pages/CreateListing"
import UpdateListing from "./pages/UpdateListings"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import PrivateRoute from './components/PrivateRoute'
import Listing from "./pages/Listing"
import Search from "./pages/Search"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import Subscribe from "./components/Payments/Subscribe"
import NotFound from "./components/Payments/NotFound"
import PaymentSuccess from "./components/Payments/PaymentSuccess"
import PaymentFail from "./components/Payments/PaymentFail"
import WishList from "./pages/WishList"

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path='/search' element={<Search />} />
    <Route path="/listing/:listingId" element={<Listing/> } />
    <Route element={<PrivateRoute/>}>
    <Route element={<PrivateRoute />}>
          <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-post' element={<CreateListing />} />
        </Route>
        </Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/create-listing" element={<CreateListing/>} />
    <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
    <Route path="/subscribe" element={<Subscribe/>} />
    <Route path="*" element={<NotFound/>} />
    <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
    <Route path="/paymentfail" element={<PaymentFail/>} />
    <Route path="/wishlist" element={<WishList/>} />
    
    
    </Route>
  </Routes>
  <Footer/>
  </BrowserRouter>

}
 
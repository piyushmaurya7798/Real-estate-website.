// import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
// import subscriptions from "razorpay/dist/types/subscriptions";
import { useSelector } from "react-redux";
// import  { Navigate, Redirect } from 'react-router-dom'
// import {useLocation, useNavigate} from 'react-router-dom';
// const public_stripe_key = process.env.REACT_APP_PUBLIC_STRIPE_KEY;
import axios from "axios";
// import instance from "../../../../api/server";
// import instance from "../../../../api/server.js"
// import Razorpay from "razorpay";
const Subscribe = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false)
  // const Razorpay = require('razorpay');
  // const navigate=useNavigate();
  // const handleSubscription = async (req) => {
  // console.log(currentUser)
  // setLoading(true)
  // const response = await fetch(
  //         `/api/payment/subscribe/${currentUser._id}`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "Application/JSON" },
  //           body: JSON.stringify()
  //         }
  //         )
  //         const data=await response.json();
  //         // console.log(data.subscription_short_url);

  //         // window.open(data.subscription_short_url,"_blank");
  //         window.location.href=data.subscription_short_url
  //         // useLocation(data.subscription_short_url);
  //         setLoading(false);
  // }



  const handleSubscription = async (req) => {

    // const { data: { key } } = await axios.get("localhost://3000/api/payment/razorpaykey")

    // const { data: { order } } = await axios.post("api/payment/subscribe")
    setLoading(true)
    const response = await fetch(
      `/api/payment/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(299 * 100),
          currency: "INR",
          user: currentUser

        })
      }
    )
    const data = await response.json();
    console.log(data);

    const options = {
      key: "rzp_test_4DrJJevYZkd0No",
      // amount: Number(299*100),
      // currency: "INR",
      name: "Pro",
      description: "",
      order_id: data.order.id,
      customer: {
        "name": "Gaurav Kumar",
        "contact": "+919000090000",
        "email": "gaurav.kumar@example.com"
      },
      callback_url: `http://localhost:3000/api/payment/paymentverification/${currentUser._id}`,
      theme: {
        "color": "#121212"
      }
    }
    const razor = new window.Razorpay(options);
    // console.log(razor)
    // instance.orders.create(options)
    //   console.log(order);
    setLoading(false)
    razor.open();

    // console.log(razor)

  }
  //   const stripePromise = await loadStripe("pk_test_51OwHs1SIViWTWCvY2DUQOlHcfry5gk3q8zIjpF12sV1sJFJSwGQpIljkxiW3v3ydoapbeBi486FOE0ty02wJPjbT00c6upJdu4");
  //   const response = await fetch(
  //     "http://localhost:3000/create-stripe-session-subscription",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "Application/JSON" },
  //       body: JSON.stringify([
  //         { item: "Pro", qty: "1" },
  //       ])
  //     }
  //   const session=await response.json();
  //   const result =stripe.redirectToCheckout({
  //     sessionID:session.id;
  //   })
  //   )
  // if (response.status === 409) {
  //   const data = await response.json();
  //   if (data && data.redirectUrl) {
  //     window.location.href = data.redirectUrl; // redirect to billing portal if user is already subscribed
  //   }
  // } else {
  //   const session = await response.json();
  //   stripePromise.redirectToCheckout({
  //     sessionId: session.id,
  //   });
  // }
  // };
  return (
    <div className='flex fex-col justify-center items-center borderdas w-full h-[72vh] p-5 gap-6'>
      <div className='flex flex-col rounded-lg border w-[25vw] h-[50vh] justify-center items-center'>
        <h1 className='text-center text-lg bold font-semibold p-3'>Welcome</h1>
        <div className='border text-center text-white rounded-lg bg-slate-700 pt-3 w-full h-[50px]'>Pro Pack - &#8377; 299.00</div>

        <div className='flex flex-col p-[50px] gap-4 items-center justify-center'>
          <span>Join pro pack and get access to Listing Your
            own house

          </span>
          <span>&#8377; 299 only</span>
          <button onClick={() => handleSubscription()} className='border rounded-lg text-white bg-slate-700 w-[25vh] hover:cursor-pointer hover:opacity-95 disabled:opacity-80' >{loading ? 'Please wait...' : 'Buy Now'}</button>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
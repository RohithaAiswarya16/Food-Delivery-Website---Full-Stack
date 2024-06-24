import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItem,url } = useContext(StoreContext);

  const[data,setData ] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event)=>{
    const name=event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

   const placeOrder = async (event) =>{
    // event.preventDefault();
    // let orderItems = [];
    // food_list.map((item)=>{
    //   if(cartItem[item._id]>0){
    //     let itemInfo = item;
    //     itemInfo['quantity'] = cartItem[item._id];
    //     orderItems.push(itemInfo);
    //   }
    // });
    // let orderData = {
    //   address:data,
    //   items:orderItems,
    //   amount:getTotalCartAmount()+2
    // }
    event.preventDefault();
  console.log('Placing order...');

  let orderItems = [];
  food_list.map((item) => {
    if (cartItem[item._id] > 0) {
      let itemInfo = item;
      itemInfo['quantity'] = cartItem[item._id];
      orderItems.push(itemInfo);
    }
  });
  let orderData = {
    address: data.city+data.country+data.state+data.street,
    items: orderItems,
    amount: getTotalCartAmount() + 2,
  };
    // let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    // try {
    //   // console.log(response.data);
    //   if(response.data.success){
    //     const {session_url} = response.data;
    //     window.location.replace(session_url);
    //     // console.log(cartItem.amount);
    //   }
      
    // } catch (error) {
    //   alert("error")
    //   console.log("raale");
      
    // }

    try {
      console.log('Sending request to API...');
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      console.log('Response:', response);
      console.log(orderData.address);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
        
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error occurred while placing order");
    }
//     let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
//  .then((response) => {
//     // try block code here
//     if (response.data.success) {
//       const { session_url } = response.data;
//       window.location.replace(session_url);
//     }
//   })
//  .catch((error) => {
//     // error handling code here
//     console.log(error.response.data); // or error.message
//     console.log("raale");
//   });
    
    
   }

  
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder="First Name" />
          <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder="Last Name" />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name='country' onChange={onChangeHandler} value={data.country}  type="text" placeholder="Country" />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

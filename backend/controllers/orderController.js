import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js"

import Stripe from "stripe"

// import orderModel from "../models/orderModel.js";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend

const placeOrder = async (req,res)=>{
    // if (!req.body || !req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
    //     return res.status(400).json({ success: false, message: 'Missing required properties' });
    //   }
    
    //   if (!Array.isArray(req.body.items)) {
    //     return res.status(400).json({ success: false, message: 'Items must be an array' });
    //   }

    const frontend_url = "http://localhost:5173"
    // console.log(req.body);



    try {
        // ...
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        console.log('Saving new order...');
        await newOrder.save();
        console.log('New order saved:', newOrder);
        console.log('Updating user cart data...');
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        console.log('User cart data updated');
    
        const line_items = req.body.items.map((items) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: items.name
                },
                unit_amount: items.price * 100 * 80
            },
            quantity: items.quantity
        }));
    
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });
    
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
    
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            session_url: session.url
        });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: "Error andi" });
    }
    // try {
        
    //     const newOrder = new orderModel({
    //         userId: req.body.userId,
    //         items: req.body.items,
    //         amount: req.body.amount,
    //         address: req.body.address,
    //       });
    //       console.log('Saving new order...');
    //       await newOrder.save();
    //       console.log('New order saved:', newOrder);
    //       console.log('Updating user cart data...');
    //       await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    //       console.log('User cart data updated');
    //       res.status(201).json({ success: true, message: 'Order placed successfully' });
    //     const line_items = req.body.items.map((items)=>({
    //         price_data:{
    //             currency:"inr",
    //             product_data:{
    //                 name:items.name
    //             },
    //             unit_amount:items.price*100*80
    //         },
    //         quantity:items.quantity
    //     }))
        
    //     line_items.push({
    //         price_data:{
    //             currency:"inr",
    //             product_data:{
    //                 name:"Delivery Charges"
    //             },
    //             unit_amount:2*100*80
    //         },
    //         quantity:1
    //     })

    //     const session = await stripe.checkout.sessions.create({
    //         line_items: line_items,
    //         mode: 'payment',
    //         success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    //         cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    //     });
    
    //     res.status(201).json({
    //         success: true,
    //         message: 'Order placed successfully',
    //         session_url: session.url
    //     });
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.json({ success: false, message: "Error andi" });
    // }
    //     const session = await stripe.checkout.sessions.create({
    //         line_items:line_items,
    //         mode:'payment',
    //         success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    //         cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`


    //     })

    //     res.json({success:true,session_url:session.url})


    // } catch (error) {
    //     console.error('Error:', error);
    //     res.json({success:false,message:"Error andi"});
    // }
}

const verifyOrder = async (req,res) =>{
    const {orderId,success } = req.body;
    try {
        if(success=='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
        
    }
}

export {placeOrder,verifyOrder}




import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://tarunvaka2003:Tarun9797@cluster0.pyjhkrl.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}

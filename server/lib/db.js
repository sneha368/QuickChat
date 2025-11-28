import mongoose from "mongoose";

//connect with mongodb
export const connectDb=async()=>{
try{
    mongoose.connection.on('connected',()=>{
        console.log("MongoDB connected successfully");
    });
    mongoose.connection.on('error',(err)=>{
        console.error("MongoDB connection error:", err);
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
}
catch(error){
    console.error("Error connecting to MongoDB:", error);
}
}
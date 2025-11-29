import { generateToken } from "../lib/util";
import bcrypt from "bcryptjs";
import UserActivation from "../model/userActivationModel";
import cloudinary from "../lib/cloudinary";
export const signup=async(req,res)=>{
    const{fullName,email,password,bio}=req.body;
try{
    if(!fullName||!email||!password||!bio){
        return res.json({success:false,message:"All fields are required"})
    }
    const user=await UserActivation.findOne({email});
    if(user){
    return res.json({success:false,message:"Account already exists"})

    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=await UserActivation.create({
        fullName,email,password:hashedPassword,bio
    });

    const token=generateToken(newUser._id);
    return res.json({success:true,message:"Account created successfully",token,userData:newUser});
        
}
    catch(error){
res.json({success:false,message:error.message});
console.log(error.message);
    }
}


//login

export const login=async(req,res)=>{
    try{
    const{email,password}=req.body;
const userData=await UserActivation.findOne({email});


const isPasswordCorrect=await bcrypt.compare(password,userData.password);
if(!isPasswordCorrect){
    return res.json({success:false,message:"Invalid credentials"});
}
const token=generateToken(userData._id);
return res.json({success:true,message:"Login successful",token,userData});

    }
    catch(error){
        res.json({success:false,message:error.message});
        console.log(error.message);
    }   
};


export const checkAuth=(req,res)=>{
    res.json({success:true,message:"User is authenticated",user:req.user});

}

// to update profile detials

export const updateProfile=async(req,res)=>{
    try{
        const{fullname,bio,profilePic}=req.body;
        const userId=req.user._id;
        let updatedUser;

        if(!profilePic){
         updatedUser=   await User.findIdAndUpdate(userId,{bio,fullname},{new:true});
        }
        else{
            const upload=await cloudinary.uploader.upload(profilePic);
 
            updatedUser=await User.findByIdAndUpdate(userId,{bio,fullname,profilePic:upload.secure_url},{new:true});
        }
        res.json({success:true,message:"Profile updated successfully",user:updatedUser});   
    }catch(error){
        res.json({success:false,message:error.message});
        console.log(error.message);
    }

}
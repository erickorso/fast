import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from '@/models/user'
import COMMON_CONSTANTS from "@/lib/constants/common";

type SignupModelBody = {
  email: String,
  password:  String,
  fullname: String
}
const signup = async (body: SignupModelBody) => {
    const { email } = body;
    await connectDB();
    const userFound = await User.findOne({ email });
  
    if(userFound) return NextResponse.json({
      message: COMMON_CONSTANTS.validations.emailExists,
      status: 409
    });
    const newUser = new User(body);
  
    const savedUser = await newUser.save();
    
    return NextResponse.json({ message: "Signup POST", data: {
      id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email
    }, status: 200});
}

export default {
  signup
}

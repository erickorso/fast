import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from '@/models/user'
import bcrypt from 'bcryptjs'
import COMMON_CONSTANTS from "@/lib/constants/common";

type SigninModelBody = {
  email: String,
  password:  any
}
const signin = async (body: SigninModelBody) => {
    const { email, password } = body;
    await connectDB();
    const userFound = await User.findOne({ email });
    const isPasswordValid = password === userFound.password;

    if (!isPasswordValid) {
        return NextResponse.json({
            message: "Contraseña incorrecta",
            status: 401,
            pass:{
              password,
              p: userFound.password
            }
        });
    }
    
    return NextResponse.json({ message: "Login success!", status: 200 });
}

export default {
  signin
}

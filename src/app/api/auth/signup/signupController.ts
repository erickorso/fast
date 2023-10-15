import { NextResponse } from "next/server";
import model from './signupModel'
import COMMON_CONSTANTS from "@/lib/constants/common";
import { hashPassword } from "@/lib/functions";

const signup = async (request: Request) => {
  const { validations: {
    passwordLenght,
    fullnameLenght,
    emailLenght,
    serverError
  } } = COMMON_CONSTANTS
  try {
    const body = await request.json();
    const { email, password, fullname } = body;
  
    if(!password || password.length < 6) return NextResponse.json({
      message: passwordLenght,
      status: 400
    })
  
    if(!fullname || fullname.length < 6) return NextResponse.json({
      message: fullnameLenght,
      status: 400
    })

    if(!email || email.length < 4) return NextResponse.json({
      message: emailLenght,
      status: 400
    })

    const hashPass = hashPassword(password);

    return model.signup({
      ...body,
      password: hashPass
    })

  } catch (error) {
    return NextResponse.json({
      message: serverError + ' signup',
      status: 500
    })
  }
}

export default {
  signup
}

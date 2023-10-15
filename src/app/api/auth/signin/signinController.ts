import { NextResponse } from "next/server";
import model from './signinModel'
import COMMON_CONSTANTS from "@/lib/constants/common";
import { hashPassword } from "@/lib/functions";

const signin = async (request: Request) => {
  const { validations: {
    passwordLenght,
    emailLenght,
    serverError
  } } = COMMON_CONSTANTS
  try {
    const body = await request.json();
    const { email, password } = body;
  
    if(!password || password.length < 6) return NextResponse.json({
      message: passwordLenght,
      status: 400
    })

    if(!email || email.length < 4) return NextResponse.json({
      message: emailLenght,
      status: 400
    })

    const hashPass = hashPassword(password);

    return model.signin({
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
  signin
}

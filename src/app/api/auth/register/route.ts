import User from "@/models/user.model"
import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest)
{
    try {
        await connectDb()
        const{name,email,password}=await req.json()
        const exsistUser=await User.findOne({email})
        if(exsistUser)
        {
            return NextResponse.json(
                {
                    message:"Email Alreasy Exsist"
                },
                {status:400}
            )
        }
        if(password.length<6)
        {
            return NextResponse.json(
                  {
                    message:"Email Alreasy Exsist"
                },
                {status:400}
            )
        }
    } catch (error) {
        
    }
}
//db connect
//name,email,password from frontend
//email.check
//account
//password 6 character
//encrypt the password using salting
//user create
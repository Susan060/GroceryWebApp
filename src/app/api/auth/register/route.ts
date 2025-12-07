import "server-only"
import User from "@/models/user.model"
import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,password:hashedPassword
        })
         return NextResponse.json(
                 user,
                {status:200}
            )
    } catch (error) {
         return NextResponse.json(
                  {
                    message:`register error ${error}`
                },
                {status:500}
            )
    }
}
//db connect
//name,email,password from frontend
//email.check
//account
//password 6 character
//encrypt the password using salting
//user create
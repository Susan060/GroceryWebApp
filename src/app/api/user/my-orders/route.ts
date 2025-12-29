import connectDb from "@/lib/db";
import {auth} from "@/auth"
import { NextRequest,NextResponse } from "next/server";
import Order from "@/models/order.model";

export async function GET(req:NextRequest) {
    try {
        await connectDb()
        const session=await auth()
        const orders=await Order.find({user:session?.user?.id}).populate("user").sort({createdAt:-1})
        if(!orders)
        {
            return NextResponse.json(
                {message:"Orders Not Found"},
                {status:400}
            )
        }
        return NextResponse.json(orders,{status:200})

    } catch (error) {
        return NextResponse.json(
            {message:`Get all orders Error${error}`},
            {status:500}
        )
    }
    
}
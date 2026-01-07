import Grocery from "@/models/grocery.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const groceries=await Grocery.find({})
        return NextResponse.json(
            groceries,
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {message:`Get groceries erro ${error}`},
            {status:500}
        )
    }
    
}
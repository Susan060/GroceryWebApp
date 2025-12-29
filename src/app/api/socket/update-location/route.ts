// import connectDb from "@/lib/db";
// import User from "@/models/user.model";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         await connectDb()
//         const { userId, location } = await req.json()
//         if (!userId || !location) {
//             return NextResponse.json(
//                 { message: "Missing userId Or Location" },
//                 { status: 400 }

//             )
//         }
//         const user = await User.findByIdAndUpdate(userId, { location })
//         if (!user) {
//             return NextResponse.json(
//                 { message: "User Not Found" },
//                 {status:400}
//             )
//         }
//          return NextResponse.json(
//                 { message: "Location Updated" },
//                 {status:400}
//             )
//     } catch (error) {
//         return NextResponse.json(
//             {message:`update location error ${error}`},
//             {status:500}
//         )
//     }

// }
// pages/api/socket/update-location.ts
import connectDb from '@/lib/db';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { userId, location } = await req.json();
    if (!userId || !location?.coordinates) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(userId, {
      location,
    }, { new: true });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 400 });
    }

    return NextResponse.json({ message: "Location Updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

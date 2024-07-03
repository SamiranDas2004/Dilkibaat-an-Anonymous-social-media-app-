import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import MessageModel from "@/models/messages";

export async function POST(request: NextRequest) {
    await dbConnect();

   try {
     const { userId } = await request.json();
     const findUser = await UserModel.findById(userId) // Populate messages
 
     if (!findUser) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
     }
 
     const messages = await MessageModel.find({user:userId});
 
     return NextResponse.json({findUser,messages});
   } catch (error:any) {
    console.error("Error removing follower:", error);

    return NextResponse.json({
      success: false,
      message: "An error occurred while removing the follower"
    }, {
      status: 500
    });
   }
}
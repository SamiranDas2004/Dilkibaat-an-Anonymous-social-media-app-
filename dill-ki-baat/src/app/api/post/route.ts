import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import MessageModel from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const requestBody = await request.json();
    console.log("Request body:", requestBody);
    const { content, userId } = requestBody;

    // Find the user by ID and populate messages
    let findUser = await UserModel.findById(userId).populate('messages');
    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, {
        status: 404
      });
    }

    // Create a new message
    const newMessage:any = MessageModel.create({
      user: userId,
      content: content
    });

    // Save the new message
   
    console.log("Saved message:", newMessage);

    // Add the new message ID to the user's messages array
    findUser.messages.push(newMessage);
    await findUser.save();
    

    // Re-fetch the user with populated messages
    findUser = await UserModel.findById(userId).populate('messages');

    return NextResponse.json({
      success: true,
      message: "Message created successfully",
      data: findUser
    });

  } catch (error: any) {
    console.error("Error creating message:", error);

    return NextResponse.json({
      success: false,
      message: "An error occurred during message creation"
    }, {
      status: 500
    });
  }
}

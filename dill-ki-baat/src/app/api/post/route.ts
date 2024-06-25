import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import MessageModel from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { content, userId } = await request.json();

    // Find the user by ID
    const findUser = await UserModel.findById(userId);

    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, {
        status: 404
      });
    }

    // Create a new message
    const newMessage = new MessageModel({
      user: userId,
      content: content
    });

    // Save the new message
    const savedMessage:any = await newMessage.save();

    // Ensure findUser.messages is initialized and add the message ID
    findUser.messages = findUser.messages || [];
    findUser.messages.push(savedMessage._id);
    await findUser.save();

    return NextResponse.json({
      success: true,
      message: "Message created successfully",
      data: savedMessage
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

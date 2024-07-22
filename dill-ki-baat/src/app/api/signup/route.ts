// pages/api/signup.ts
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { name, email, avatar } = await request.json();

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User is already registered" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = await UserModel.create({
      name,
      email,
      avatar,
      // Password is not required here as it might be handled separately
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(
      { success: false, message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // Ensure request body is correctly parsed
    const { email, password } = await request.json();

  

    // Check if user exists
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
     
      return NextResponse.json({
        success: false,
        message: "Login failed: User not found"
      }, {
        status: 401
      });
    }

    // Check if password matches
    console.log(findUser.password);

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      console.log(`Incorrect password for email: ${email}`);
      return NextResponse.json({
        success: false,
        message: "Login failed: Incorrect password"
      }, {
        status: 401
      });
    }

    console.log(`Login successful for email: ${email}`);

    // Successful login
    return NextResponse.json({
      success: true,
      message: "Login successful"
    });

  } catch (error: any) {
    console.error("Error during login:", error);

    return NextResponse.json({
      success: false,
      message: "An error occurred during login"
    }, {
      status: 500
    });
  }
}

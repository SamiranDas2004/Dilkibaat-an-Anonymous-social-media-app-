import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { userId, followerId } = await request.json();

    // Find the user and the follower by their IDs
    const findUser = await UserModel.findById(userId);
    const findFollower = await UserModel.findById(followerId);

    if (!findUser || !findFollower) {
      return NextResponse.json({
        success: false,
        message: "User or follower not found"
      }, {
        status: 404
      });
    }

    // Check if the follower is already in the user's followers array
    const isUserAlreadyFollows = findUser.followers.includes(followerId);

    if (isUserAlreadyFollows) {
      return NextResponse.json({
        success: false,
        message: "User already follows"
      }, {
        status: 400
      });
    }

    // Add the follower to the user's followers array
    findUser.followers.push(followerId);
    await findUser.save();

    return NextResponse.json({
      success: true,
      message: "Follower added successfully",
      data: findUser
    });

  } catch (error: any) {
    console.error("Error adding follower:", error);

    return NextResponse.json({
      success: false,
      message: "An error occurred while adding the follower"
    }, {
      status: 500
    });
  }
}

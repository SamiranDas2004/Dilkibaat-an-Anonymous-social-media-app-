import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();  // Await dbConnect

  try {
    const { profileId, followerId } = await request.json();

    if (!profileId || !followerId) {
      return NextResponse.json({
        success: false,
        message: "User or follower not found"
      }, {
        status: 404
      });
    }

    const findProfile = await UserModel.findById(profileId);

    if (!findProfile) {
      return NextResponse.json({
        success: false,
        message: "Profile is not valid"
      }, {
        status: 400
      });
    }

    const allFollowers = findProfile.followers;

    console.log(allFollowers);

    const unFollow = allFollowers.filter((id) => id.toString() !== followerId); // Ensure proper comparison

    findProfile.followers = unFollow;
    await findProfile.save(); // Await the save operation

    return NextResponse.json({
      success: true,
      message: "Unfollowed successfully",
      findProfile
    });
  } catch (error) {
    console.error("Error removing follower:", error);

    return NextResponse.json({
      success: false,
      message: "An error occurred while removing the follower"
    }, {
      status: 500
    });
  }
}

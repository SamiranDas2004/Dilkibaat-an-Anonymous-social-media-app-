import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/user";
import MessageModel,{Message} from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    await dbConnect();

    try {
        const { userId, messageId } = await request.json();

        // Find the user by ID
        const findUser: User | null = await UserModel.findById(userId);
        if (!findUser) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        // Find the message by ID
        const deleteMessage: Message | null = await MessageModel.findByIdAndDelete(messageId);
        if (!deleteMessage) {
            return NextResponse.json({
                success: false,
                message: "Message not found or already deleted"
            }, {
                status: 404
            });
        }

        // Remove the message ID from the user's messages array
        findUser.messages = findUser.messages.filter(msgId => msgId.toString() !== messageId);

        // Save the updated user object
        await findUser.save();

        return NextResponse.json({
            success: true,
            message: "Message deleted successfully"
        });

    } catch (error: any) {
        console.error("Error deleting message:", error);

        return NextResponse.json({
            success: false,
            message: "An error occurred during message deletion"
        }, {
            status: 500
        });
    }
}

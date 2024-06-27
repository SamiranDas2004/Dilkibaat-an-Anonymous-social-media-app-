import dbConnect from "@/lib/dbConnect";
import MessageModel,{Message} from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await dbConnect();

    try {
        const { messageId, content } = await request.json();

        // Check if messageId or content is missing
        if (!messageId || !content) {
            return NextResponse.json({
                success: false,
                message: "Message ID and content are required"
            }, {
                status: 400
            });
        }

        // Find and update the message
        const updatedMessage: Message | null = await MessageModel.findByIdAndUpdate(
            messageId,
            { content: content },
            { new: true } // Return the updated document
        );

        // Check if message was not found
        if (!updatedMessage) {
            return NextResponse.json({
                success: false,
                message: "Message not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Message updated successfully",
            data: updatedMessage
        });

    } catch (error: any) {
        console.error("Error updating message:", error);

        return NextResponse.json({
            success: false,
            message: "An error occurred during message update"
        }, {
            status: 500
        });
    }
}

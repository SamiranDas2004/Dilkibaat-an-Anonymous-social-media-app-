import mongoose, { Schema, Document, Model } from "mongoose";

export interface Message extends Document {
    user: mongoose.Types.ObjectId;
    content: string;
}

const messageSchema: Schema<Message> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const MessageModel = (mongoose.models.Message as Model<Message>) || mongoose.model<Message>('Message', messageSchema);

export default MessageModel;

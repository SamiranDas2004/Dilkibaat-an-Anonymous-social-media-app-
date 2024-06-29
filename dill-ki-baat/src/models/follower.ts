import mongoose, { Schema, Document, Model } from "mongoose";

export interface Follower extends Document{
    follower:mongoose.Schema.Types.ObjectId
}

const FollowerSchema:Schema<Follower>=new Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }
})

const followerModel=(mongoose.models.Follower as Model<Follower>)||  mongoose.model<Follower>("followes",FollowerSchema)
export default followerModel 
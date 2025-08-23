import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  author: string;
  likes: number;
  likedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      maxlength: 300,
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    author: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{
      type: String, // storing userId
    }],
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ title: "text", content: "text", tags: "text" });

export default mongoose.model<IPost>("Post", PostSchema);


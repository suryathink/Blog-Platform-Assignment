import mongoose from "mongoose";
import Post, { IPost } from "../models/Post";

export interface PostCreateData {
  title: string;
  content: string;
  tags: string[];
}

export interface PostUpdateData {
  title?: string;
  content?: string;
  summary?: string;
  tags?: string[];
}

export interface PostFilter {
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export class PostService {
  public static async createPost(postData: PostCreateData) {
    try {
      const post = new Post(postData);
      const savedPost = await post.save();
      
      return {
        isError: false,
        data: savedPost,
      };
    } catch (error: any) {
      return {
        isError: true,
        message: "Failed to create post",
        data: error.message,
      };
    }
  }

  public static async getAllPosts(filter: PostFilter = {}) {
    try {
      const { tags, search, page = 1, limit = 10 } = filter;
      const skip = (page - 1) * limit;
      
      // Build query
      let query: any = {};
      
      if (tags && tags.length > 0) {
        query.tags = { $in: tags };
      }
      
      if (search) {
        query.$text = { $search: search };
      }
      
      const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      
      const total = await Post.countDocuments(query);
      
      return {
        isError: false,
        data: {
          posts,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error: any) {
      return {
        isError: true,
        message: "Failed to fetch posts",
        data: error.message,
      };
    }
  }

  public static async getPostById(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          isError: true,
          message: "Invalid post ID",
        };
      }

      const post = await Post.findById(id).lean();
      
      if (!post) {
        return {
          isError: true,
          message: "Post not found",
        };
      }
      
      return {
        isError: false,
        data: post,
      };
    } catch (error: any) {
      return {
        isError: true,
        message: "Failed to fetch post",
        data: error.message,
      };
    }
  }

  public static async updatePost(id: string, updateData: PostUpdateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          isError: true,
          message: "Invalid post ID",
        };
      }

      const post = await Post.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!post) {
        return {
          isError: true,
          message: "Post not found",
        };
      }
      
      return {
        isError: false,
        data: post,
      };
    } catch (error: any) {
      return {
        isError: true,
        message: "Failed to update post",
        data: error.message,
      };
    }
  }

  public static async deletePost(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          isError: true,
          message: "Invalid post ID",
        };
      }

      const post = await Post.findByIdAndDelete(id);
      
      if (!post) {
        return {
          isError: true,
          message: "Post not found",
        };
      }
      
      return {
        isError: false,
        data: { message: "Post deleted successfully" },
      };
    } catch (error: any) {
      return {
        isError: true,
        message: "Failed to delete post",
        data: error.message,
      };
    }
  }

  public static async likePost(id: string, userIdentifier: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          isError: true,
          message: "Invalid post ID",
        };
      }

      const post = await Post.findById(id);
      
      if (!post) {
        return {
          isError: true,
          message: "Post not found",
        };
      }

      const hasLiked = post.likedBy.includes(userIdentifier);
      
      if (hasLiked) {
        // Unlike
        post.likedBy = post.likedBy.filter(id => id !== userIdentifier);
        post.likes = Math.max(0, post.likes - 1);
      } else {
        // Like
        post.likedBy.push(userIdentifier);
        post.likes += 1;
      }
      
      await post.save();
      
      return {
        isError: false,
        data: {
          likes: post.likes,
          hasLiked: !hasLiked,
        },
      };
    } catch (error: any) {
      return {
        isError: true,
        message: "Failed to update like status",
        data: error.message,
      };
    }
  }

  public static async getAllTags() {
    try {
      const tags = await Post.distinct("tags");
      
      return {
        isError: false,
        data: tags.sort(),
      };
    } catch (error: any) {
      return {
        isError: true,
        message: "Failed to fetch tags",
        data: error.message,
      };
    }
  }
}
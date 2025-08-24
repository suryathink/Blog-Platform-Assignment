import { Request, Response } from "express";
import httpStatus from "http-status";
import { logApiError } from "../helpers/logApiError";
import { PostService } from "../services/postService";

export class PostController {
  public static async createPost(req: Request, res: Response) {
    try {
      const { title, content,  tags,  } = req.body;

      if (!title || !content || !tags) {
        return res.status(httpStatus.BAD_REQUEST).send({
          statusCode: httpStatus.BAD_REQUEST,
          message: "Missing required fields: title, content, tags",
        });
      }

      const response = await PostService.createPost({
        title,
        content,
        tags: tags || [],
      });

      if (response && "isError" in response && response.isError) {
        return res.status(httpStatus.BAD_REQUEST).send({
          statusCode: httpStatus.BAD_REQUEST,
          message: response?.message,
          data: response?.data,
        });
      } else {
        return res.status(httpStatus.CREATED).send({
          statusCode: httpStatus.CREATED,
          message: "Post created successfully",
          data: response?.data,
        });
      }
    } catch (error) {
      logApiError(req, error as unknown as any);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }

  public static async getAllPosts(req: Request, res: Response) {
    try {
      const { tags, search, page, limit } = req.query;

      const filter = {
        tags: tags ? (tags as string).split(",") : undefined,
        search: search as string,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      };

      const response = await PostService.getAllPosts(filter as any);

      if (response && "isError" in response && response.isError) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: response?.message,
          data: response?.data,
        });
      } else {
        return res.send({
          statusCode: httpStatus.OK,
          data: response?.data,
        });
      }
    } catch (error) {
      logApiError(req, error as unknown as any);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }

  public static async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await PostService.getPostById(id!);

      if (response && "isError" in response && response.isError) {
        return res.status(httpStatus.NOT_FOUND).send({
          statusCode: httpStatus.NOT_FOUND,
          message: response?.message,
          data: response?.data,
        });
      } else {
        return res.send({
          statusCode: httpStatus.OK,
          data: response?.data,
        });
      }
    } catch (error) {
      logApiError(req, error as unknown as any);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }

  public static async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, summary, tags } = req.body;

      if (!id) {
        return res.status(httpStatus.BAD_REQUEST).send({
          statusCode: httpStatus.BAD_REQUEST,
          message: "No valid id found",
        });
      }

      const updateData = {
        ...(title && { title }),
        ...(content && { content }),
        ...(summary && { summary }),
        ...(tags && { tags }),
      };

      if (Object.keys(updateData).length === 0) {
        return res.status(httpStatus.BAD_REQUEST).send({
          statusCode: httpStatus.BAD_REQUEST,
          message: "No valid fields to update",
        });
      }

      const response = await PostService.updatePost(id, updateData);

      if (response && "isError" in response && response.isError) {
        return res.status(httpStatus.NOT_FOUND).send({
          statusCode: httpStatus.NOT_FOUND,
          message: response?.message,
          data: response?.data,
        });
      } else {
        return res.send({
          statusCode: httpStatus.OK,
          message: "Post updated successfully",
          data: response?.data,
        });
      }
    } catch (error) {
      logApiError(req, error as unknown as any);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }

  public static async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(httpStatus.BAD_REQUEST).send({
          statusCode: httpStatus.BAD_REQUEST,
          message: "No valid id found",
        });
      }

      const response = await PostService.deletePost(id);

      if (response && "isError" in response && response.isError) {
        return res.status(httpStatus.NOT_FOUND).send({
          statusCode: httpStatus.NOT_FOUND,
          message: response?.message,
          data: response?.data,
        });
      } else {
        return res.send({
          statusCode: httpStatus.OK,
          data: response?.data,
        });
      }
    } catch (error) {
      logApiError(req, error as unknown as any);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }

  public static async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(httpStatus.BAD_REQUEST).send({
          statusCode: httpStatus.BAD_REQUEST,
          message: "No valid id found",
        });
      }

      const userIdentifier = req.ip || req.body.userIdentifier || "anonymous";

      const response = await PostService.likePost(id, userIdentifier);

      if (response && "isError" in response && response.isError) {
        return res.status(httpStatus.NOT_FOUND).send({
          statusCode: httpStatus.NOT_FOUND,
          message: response?.message,
          data: response?.data,
        });
      } else {
        return res.send({
          statusCode: httpStatus.OK,
          data: response?.data,
        });
      }
    } catch (error) {
      logApiError(req, error as unknown as any);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }

  public static async getAllTags(req: Request, res: Response) {
    try {
      const response = await PostService.getAllTags();

      if (response && "isError" in response && response.isError) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: response?.message,
          data: response?.data,
        });
      } else {
        return res.send({
          statusCode: httpStatus.OK,
          data: response?.data,
        });
      }
    } catch (error) {
      logApiError(req, error as unknown as any);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      });
    }
  }
}

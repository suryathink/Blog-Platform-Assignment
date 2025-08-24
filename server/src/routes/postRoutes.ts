
import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();

router.post("/", PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/tags", PostController.getAllTags);
router.get("/:id", PostController.getPostById);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.post("/:id/like", PostController.likePost);

export { router as postRoutes };

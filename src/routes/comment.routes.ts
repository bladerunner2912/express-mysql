import express from "express";
import commentController from "../controllers/comment.controller";
import { verifyJwtToken } from "../utils/verify.token";
const router = express.Router();

router.post("/create", verifyJwtToken, commentController.createComment);

router.get("/fetch", commentController.fetchComment);

router.get("/fetchBlogComments", commentController.fetchBlogComments);

router.put("/update", verifyJwtToken, commentController.updateComment);

router.delete("/delete", verifyJwtToken, commentController.deleteComment);

export = router;

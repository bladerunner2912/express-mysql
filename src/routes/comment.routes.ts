import express from "express";
import commentController from "../controllers/comment.controller";

const router = express.Router();

router.post("/create", commentController.createComment);

router.get("/fetch", commentController.fetchComment);

router.get("/fetchBlogComments", commentController.fetchBlogComments);

router.put("/update", commentController.updateComment);

router.delete("/delete", commentController.deleteComment);

export = router;

import express from "express";
import blogController from "../controllers/blog.controller";

const router = express.Router();

router.post("/create", blogController.createBlog);
router.put("/update", blogController.updateBlog);
router.delete("/delete", blogController.deleteBlog);

export = router;

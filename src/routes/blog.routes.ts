import express from "express";
import blogController from "../controllers/blog.controller";
import { verifyJwtToken } from "../utils/verify.token";

const router = express.Router();

router.post("/create", verifyJwtToken, blogController.createBlog);
router.put("/update", verifyJwtToken, blogController.updateBlog);
router.delete("/delete", verifyJwtToken, blogController.deleteBlog);

export = router;

import express from "express";
import controller from "../controllers/user.controller";
const router = express.Router();

router.post("/register", controller.registerUser);
router.get("/login", controller.loginUser);
router.put("/update", controller.updateUser);
export = router;

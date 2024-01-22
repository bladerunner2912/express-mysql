import express from "express";
import controller from "../controllers/user.controller";
import { verifyJwtToken } from "../utils/verify.token";
const router = express.Router();

router.post("/register", verifyJwtToken, controller.registerUser);

router.get("/login", verifyJwtToken, controller.loginUser);

router.put("/update", verifyJwtToken, controller.updateUser);

export = router;

import express from "express";
import {
  getUsersController,
  getUserByIdController,
  createUserController,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);

export default router;

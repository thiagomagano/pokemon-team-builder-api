import express from "express";
import {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;

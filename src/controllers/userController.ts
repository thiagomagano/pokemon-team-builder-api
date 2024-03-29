import { Request, Response } from "express";
import { IUser as User } from "../models/User";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../services/UserService";

export const getUsersController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: User[] = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  const user: User | null = await getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.body;
  try {
    const newUser = await createUser(user);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  const user = req.body;
  try {
    const updatedUser = await updateUser(userId, user);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  try {
    const user: User | null = await deleteUser(userId);
    res.json({ msg: "User deleted with sucess", user: user });
  } catch (err) {
    res.status(404).json({ error: "User not deleted" });
  }
};

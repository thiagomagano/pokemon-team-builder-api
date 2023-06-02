import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};
export const getUserById = async (userId: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
};

export const createUser = async (user: User): Promise<User> => {
  const newUser = await prisma.user.create({ data: user });
  return newUser;
};
export const updateUser = async (userId: number, user: User): Promise<User> => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: user,
  });
  return updatedUser;
};

export const deleteUser = async (userId: number): Promise<User | null> => {
  const deletedUser = await prisma.user.delete({ where: { id: userId } });
  return deletedUser;
};

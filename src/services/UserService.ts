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

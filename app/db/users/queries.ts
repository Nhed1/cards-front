import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertUser, SelectUser, userTable } from "../schema";

export const getUserByEmail = async (
  email: SelectUser["email"]
): Promise<SelectUser[]> => {
  return await db.select().from(userTable).where(eq(userTable.email, email));
};

export const getUserById = async (
  id: SelectUser["id"]
): Promise<SelectUser[]> => {
  return await db.select().from(userTable).where(eq(userTable.id, id));
};

export const createUser = async (data: InsertUser) => {
  return await db.insert(userTable).values(data);
};

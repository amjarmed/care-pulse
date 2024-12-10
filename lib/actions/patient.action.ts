"use server";
import { users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { ID, Query } from "node-appwrite";

export async function createUser(user: CreateUserParams) {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // check if user already exists
    if (error && error?.code === 409) {
      console.log("User already exists");

      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      return existingUser.users[0];
    }

    console.log("An error occurred while creating user:", error);
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

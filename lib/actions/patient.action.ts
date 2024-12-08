import { users } from "@/lib/appwrite.config";
import { Query } from "appwrite";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = users;

    const result = await newUser.create();
  } catch (error) {
    if (error && error?.code === 409) {
      const documents = await users.listIdentities([
        Query.equal("email", [user.email]),
      ]);
      return documents?.identities[0];
    }
  }
}

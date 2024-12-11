"use server";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
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

/**
 * Registers a patient by creating a new user and a new document in the Patient collection with the user's data.
 * If the user provides an identification document, it will be uploaded to the storage and the document will be
 * updated with the file's id and url.
 * @param {RegisterUserParams} patientData - The patient's data to be registered.
 * @returns {Promise<object>} - The registered patient's data.
 */
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    // add file to the storage
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // add patient to the database
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log("An error occurred while registering user:", error);
  }
};

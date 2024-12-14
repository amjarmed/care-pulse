"use server";
import { sendSMSNotification } from "@/lib/actions/appointment.actions";
import {
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  DATABASE_ID,
  databases,
  DOCTOR_COLLECTION_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "@/lib/appwrite.config";
import { formatDateTime, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
/**
 * Creates a new user in the system using the provided user details.
 * If a user with the same email already exists, it retrieves and returns the existing user.
 *
 * @param {CreateUserParams} user - The user details including name, email, and phone.
 * @returns {Promise<object>} - The created or existing user data.
 * @throws Will log an error message if there's an issue during user creation.
 */

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

/**
 * Retrieves an existing user by their ID.
 *
 * @param {string} userId - The unique ID of the user to retrieve.
 * @returns {Promise<object>} - The user data if found. Otherwise, returns null.
 * @throws Will log an error message if there's an issue during user retrieval.
 */
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

/**
 * Retrieves a patient's data from the Patient collection by their user ID.
 * @param {string} patientId - The unique ID of the user to retrieve the patient's data.
 * @returns {Promise<object>} - The patient's data if found. Otherwise, returns null.
 * @throws Will log an error message if there's an issue during patient data retrieval.
 */
export const getPatient = async (patientId: string) => {
  try {
    const patient = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", patientId)]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates an appointment document in the database using the provided appointment data.
 * @param {UpdateAppointmentParamks} appointmentData - The appointment data to be updated.
 * @returns {Promise<object>} - The updated appointment data.
 * @throws Will log an error message if the appointment update fails.
 */
export const updatedAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }

    const smsMessage = `Hi, it's CarePulse.
     ${
       type === "scheduled"
         ? `Your appointment has been scheduled for ${
             formatDateTime(updatedAppointment.schedule).dateTime
           } with Dr. ${updatedAppointment.primaryPhysician}.`
         : `We regret to inform you that your appointment has been cancelled for the following reason: ${appointment.reason}`
     }.`;
    await sendSMSNotification({ userId, content: smsMessage });

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("An error occurred while updating appointment:", error);
  }
};

export const getDoctors = async () => {
  try {
    const doctors = await databases.listDocuments(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      [Query.equal("status", "active")]
    );
    return parseStringify(doctors.documents);
  } catch (error) {
    console.log(error);
  }
};
export const getDoctor = async (doctorId: string) => {
  try {
    const doctor = await databases.getDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      doctorId
    );
    return parseStringify(doctor);
  } catch (error) {
    console.log(error);
  }
};

"use server";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ID, Query } from "node-appwrite";

/**
 * Creates a new appointment document in the database using the provided appointment data.
 * @param {CreateAppointmentParams} appointment - The appointment data to be stored in the database.
 * @returns {Promise<object>} - The newly created appointment data.
 * @throws Will log an error message if the appointment creation fails.
 */

export const createAppointment = async ({
  ...appointment
}: CreateAppointmentParams) => {
  try {
    // add patient to the database
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...appointment,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log("An error occurred while creating appointment:", error);
  }
};

/**
 * Retrieves an appointment document from the database using the provided appointment ID.
 * @param {string} appointmentId - The ID of the appointment to be retrieved.
 * @returns {Promise<object>} - The appointment data.
 * @throws Will log an error message if the appointment retrieval fails.
 */

export const getAppointment = async (appointmentId: string) => {
  try {
    // add patient to the database
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log("An error occurred while getting appointment:", error);
  }
};

/**
 * Retrieves a list of recent appointment documents from the database ordered by creation date.
 * @returns {Promise<object>} - The appointment data with the count of scheduled, pending, and cancelled appointments
 * @throws Will log an error message if the appointment retrieval fails.
 */
export const getRecentAppointmentList = async () => {
  try {
    // add patient to the database
    const recentAppointment = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCount = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (recentAppointment.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduleCount += 1;
            break;
          case "pending":
            acc.pendingCount += 1;
            break;
          case "cancelled":
            acc.cancelledCount += 1;
            break;
          default:
            break;
        }
        return acc;
      },
      initialCount
    );

    const data = {
      totalCount: recentAppointment.total,
      ...counts,
      documents: recentAppointment.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("An error occurred while getting recent appointment:", error);
  }
};

"use client";

import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import Head from "next/head";

export default function Page() {
  try {
    throw new Error("Test Error thrown");
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    // res.status(500).json({ message: "An error occurred", error: error.message });
  }

  return (
    <div>
      <Head>
        <title>Sentry Onboarding</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl my-4"></h1>

        <p>Get started by sending us a sample error</p>

        <Button
          className="px-4 mt-8"
          onClick={async () => {
            await Sentry.startSpan(
              {
                name: "Example Frontend Span",
                op: "test",
              },
              async () => {
                const res = await fetch("/api/sentry-example-api");
                if (!res.ok) {
                  throw new Error("Sentry Example Frontend Error");
                }
              }
            );
          }}
        >
          Throw error!
        </Button>
      </main>
    </div>
  );
}

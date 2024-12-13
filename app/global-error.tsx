"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

import Error from "next/error";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("@/sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}

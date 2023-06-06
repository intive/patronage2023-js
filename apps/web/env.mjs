import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  server: {
    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),
    NEXTAUTH_SECRET: z.string(),
  },

  // need to use [] because process.env works in next js
  //https://stackoverflow.com/a/76105098
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env["NEXT_PUBLIC_API_URL"],
    UPLOADTHING_APP_ID: process.env["UPLOADTHING_APP_ID"],
    UPLOADTHING_SECRET: process.env["UPLOADTHING_SECRET"],
    NEXTAUTH_SECRET: process.env["NEXTAUTH_SECRET"],
  },
});

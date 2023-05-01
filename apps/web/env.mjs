import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },

  // need to use [] because process.env works in next js
  //https://stackoverflow.com/a/76105098
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env["NEXT_PUBLIC_API_URL"],
  },
});

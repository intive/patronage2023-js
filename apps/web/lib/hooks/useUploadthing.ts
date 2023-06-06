import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { TFileRouter } from "app/server/core";

const { useUploadThing } = generateReactHelpers<TFileRouter>();

export { useUploadThing };

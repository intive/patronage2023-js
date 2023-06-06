/** app/api/uploadthing/core.ts */
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const imageRouter = {
  imageUploader: f({
    image: { maxFileSize: "128KB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.url);
  }),
} satisfies FileRouter;

export type TFileRouter = typeof imageRouter;

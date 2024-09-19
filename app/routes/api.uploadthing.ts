import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno

import {
  createRouteHandler,
  createUploadthing,
  type FileRouter,
} from "uploadthing/remix";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (args: ActionFunctionArgs) => ({ id: "fakeId" });

const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ event }) => {
      const user = await auth(event);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export const { action, loader } = createRouteHandler({
  router: uploadRouter,
});

export type UploadRouter = typeof uploadRouter;

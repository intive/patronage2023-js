/** app/api/uploadthing/route.ts */
import { createNextRouteHandler } from "uploadthing/next";

import { imageRouter } from "app/server/core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: imageRouter,
});

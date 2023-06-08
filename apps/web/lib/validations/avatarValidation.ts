import { z } from "zod";

export default function isAvatarValid(text: string) {
  const schemaPath = z.string().startsWith("/avatars/");
  const schemaUrl = z.string().url();

  return (
    schemaPath.safeParse(text).success || schemaUrl.safeParse(text).success
  );
}

import { useTranslate } from "lib/hooks";

export default function TeamPage() {
  const { t, dict } = useTranslate("TeamPage");

  return dict.title;
}

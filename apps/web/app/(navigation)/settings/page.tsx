import { useTranslate } from "lib/hooks";

export default function SettingsPage() {
  const { t, dict } = useTranslate("SettingsPage");
  return t(dict.title);
}

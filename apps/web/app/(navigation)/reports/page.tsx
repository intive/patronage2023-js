import { useTranslate } from "lib/hooks";

export default function ReportsPage() {
  const { dict, t } = useTranslate("ReportsPage");

  return t(dict.title);
}

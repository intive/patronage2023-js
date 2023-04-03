import { useTranslate } from "lib/hooks";

export default function BudgetsPage() {
  const { t, dict } = useTranslate("BudgetsPage");
  return t(dict.title);
}

import { useTranslate } from "lib/hooks";

export default function SignUpPage() {
  const { t, dict } = useTranslate("SignUpPage");

  return (
    <div>
      <p>{t(dict.paragraph)}</p>
    </div>
  );
}

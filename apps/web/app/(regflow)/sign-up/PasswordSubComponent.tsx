import { useTranslate } from "../../../lib/hooks";

export const PasswordSubComponent = () => {
  const { t, dict } = useTranslate("SignUpPage");
  const { passwordComponent } = dict;

  return <>{t(passwordComponent.inputErrors.matchError)}</>;
};

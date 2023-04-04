"use client";
import { useTranslate } from "lib/hooks";

export const SignUpTitle = () => {
  const { dict, t } = useTranslate("SignUpPage");

  return <p>{t(dict.paragraph)}</p>;
};

"use client";
import { CardWrapperStyled, CardStyled } from "../HomePageComponents";
import { LayoutProps } from "app/layout";
import { languageAtom, languages } from "app/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export default function SingleCardLayout({ children }: LayoutProps) {
  const setLanguage = useSetAtom(languageAtom);

  useEffect(() => {
    const lang = localStorage.getItem("lang") as languages;
    setLanguage(lang ? (lang as languages) : ("en" as languages));
  }, [setLanguage]);

  return (
    <CardWrapperStyled>
      <CardStyled>{children}</CardStyled>
    </CardWrapperStyled>
  );
}

import { LanguageContext } from "lib/contexts";
import { useContext } from "react";
import { Flag } from "ui";

export const LanguageChanger = () => {
  const { currentLang, setLang } = useContext(LanguageContext);

  console.log(currentLang);

  return (
    // change theese to dropdown menu
    <>
      <Flag src="/flags/pl.svg" />
      <Flag src="/flags/fr.svg" />
      <Flag src="/flags/gb.svg" />
    </>
  );
};

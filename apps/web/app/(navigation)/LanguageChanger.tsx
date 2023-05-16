import { LanguageContext, languages } from "lib/contexts";
import { useContext } from "react";
import styled from "styled-components";
import { Flag, Button } from "ui";

export const LanguageChanger = () => {
  const { currentLang, setLang } = useContext(LanguageContext); // will I neede it?

  const setLanguage = (lang: languages) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  const ButtonStyled = styled(Button)`
    img:last-child {
      margin: -10px;
    }
  `;

  return (
    // change theese buttons to dropdown menu // types not added
    <>
      <ButtonStyled
        variant={"secondary"}
        onClick={() => setLanguage(languages.pl)}>
        <Flag src="/flags/pl.svg" />
      </ButtonStyled>
      <ButtonStyled
        variant={"secondary"}
        onClick={() => setLanguage(languages.fr)}>
        <Flag src="/flags/fr.svg" />
      </ButtonStyled>
      <ButtonStyled
        variant={"secondary"}
        onClick={() => setLanguage(languages.en)}>
        <Flag src="/flags/gb.svg" />
      </ButtonStyled>
    </>
  );
};

"use client";

import styled from "styled-components";
import { Card } from "ui";
import { useTranslate } from "lib/hooks";

const CardWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e5e5;
  height: 100%;
`;
const CardStyled = styled(Card)`
  min-width: 95%;
  min-height: 95%;
`;
export const TypoStyled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 3.5em;
  color: #1e4c40;
`;
export default function WelcomePage() {
  const { t, dict } = useTranslate("HomePage");
  return (
    <CardWrapperStyled>
      <CardStyled>
        <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      </CardStyled>
    </CardWrapperStyled>
  );
}

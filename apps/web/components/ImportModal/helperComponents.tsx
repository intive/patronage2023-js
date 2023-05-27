import { Spinner } from "ui";
import {
  LoadTutorialWrapperStyled,
  PStyled,
  SpanStyled,
  SpinnerWrapperStyled,
} from "./ImportModal.styled";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { useTranslate } from "lib/hooks";

export const LoadErrors = ({ errors }: { errors: string[] }) => {
  const theme = useContext(ThemeContext);
  const errorColor = theme.importModal.error;
  return (
    <>
      {errors.map((error) => (
        <PStyled color={errorColor} key={error}>
          {error}
        </PStyled>
      ))}
    </>
  );
};

export const LoadSpinner = () => (
  <SpinnerWrapperStyled>
    <Spinner />
  </SpinnerWrapperStyled>
);

export const LoadTutorial = () => {
  const { t, dict } = useTranslate("ImportModal");
  const theme = useContext(ThemeContext);
  const firstLineColor = theme.importModal.HLFirstLine;
  const correctDataColor = theme.importModal.HLCorrectData;

  return (
    <LoadTutorialWrapperStyled>
      <PStyled>{t(dict.tutorial.wantToUpload)}</PStyled>
      <PStyled>
        {t(dict.tutorial.correctFile)}
        <SpanStyled color={firstLineColor}>
          {t(dict.tutorial.HLFirstLine)}
        </SpanStyled>
        {t(dict.tutorial.subsequentLines)}
        <SpanStyled color={correctDataColor}>
          {t(dict.tutorial.HLCorrectData)}
        </SpanStyled>
        {t(dict.tutorial.eachLine)}
      </PStyled>
      <PStyled>{t(dict.tutorial.example)}</PStyled>
      <PStyled>
        <SpanStyled color={firstLineColor}>
          {"Name, IconName, Description, Currency, Value, StartDate, EndDate"}
        </SpanStyled>
      </PStyled>
      <PStyled>
        <SpanStyled color={correctDataColor}>
          {
            "budgetName,yellowIcon,some budget description,USD,15.00,04/20/2023 19:14:20,04/25/2023 20:14:20"
          }
        </SpanStyled>
      </PStyled>
      <PStyled>{t(dict.tutorial.useComas)}</PStyled>
    </LoadTutorialWrapperStyled>
  );
};

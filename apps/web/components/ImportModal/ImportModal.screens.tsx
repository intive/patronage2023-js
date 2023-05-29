"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { useTranslate } from "lib/hooks";
import { Spinner } from "ui";
import {
  TutorialScreenWrapperStyled,
  PStyled,
  ScreenStatusWrapperStyled,
  SpanStyled,
  SpinnerWrapperStyled,
  ErrorMessageStyled,
} from "./ImportModal.styled";
import {
  StyledHeader,
  StyledSubHeader,
} from "app/(regflow)/sign-up/SignUpFormStyled";
import {
  IconStyled,
  ScreenCircle,
} from "app/(regflow)/sign-up/SuccessErrorScreen";

type ErrorsScreenProps = {
  errors: string[];
  errorMessage: string;
};

export const ErrorsScreen = ({ errors, errorMessage }: ErrorsScreenProps) => {
  const theme = useContext(ThemeContext);
  const errorColor = theme.importModal.error;
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  return (
    <>
      {showErrorMessage && (
        <ErrorMessageStyled
          message={errorMessage}
          onClose={() => setShowErrorMessage(false)}
        />
      )}
      {errors.map((error) => (
        <PStyled color={errorColor} key={error}>
          {error}
        </PStyled>
      ))}
    </>
  );
};

export const SpinnerScreen = () => (
  <SpinnerWrapperStyled>
    <Spinner />
  </SpinnerWrapperStyled>
);

export const SuccessScreen = () => {
  const { t, dict } = useTranslate("ImportModal");
  return (
    <ScreenStatusWrapperStyled>
      <ScreenCircle success={true}>
        <IconStyled icon={"done"} iconSize={56} />
      </ScreenCircle>
      <StyledHeader>{t(dict.successHeader)}</StyledHeader>
      <StyledSubHeader>{t(dict.successSubHeader)}</StyledSubHeader>
    </ScreenStatusWrapperStyled>
  );
};

export const TutorialScreen = () => {
  const { t, dict } = useTranslate("ImportModal");
  const theme = useContext(ThemeContext);
  const firstLineColor = theme.importModal.HLFirstLine;
  const correctDataColor = theme.importModal.HLCorrectData;

  return (
    <TutorialScreenWrapperStyled>
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
      <PStyled color={firstLineColor}>
        {"Name, IconName, Description, Currency, Value, StartDate, EndDate"}
      </PStyled>
      <PStyled color={correctDataColor}>
        {
          "budgetName,yellowIcon,some budget description,USD,15.00,04/20/2023 19:14:20,04/25/2023 20:14:20"
        }
      </PStyled>
      <PStyled>{t(dict.tutorial.useComas)}</PStyled>
    </TutorialScreenWrapperStyled>
  );
};

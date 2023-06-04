"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { useTranslate } from "lib/hooks";
import { Spinner } from "ui";
import {
  InstructionWrapperStyled,
  PStyled,
  SuccessWrapperStyled,
  SpanStyled,
  ErrorMessageStyled,
  ScrollableContentStyled,
  ScreenCircleStyled,
  ScreenWrapperStyled,
} from "./ImportModal.styled";
import {
  StyledHeader,
  StyledSubHeader,
} from "app/(regflow)/sign-up/FlowController/SignUpFormStyled";
import { IconStyled } from "app/(regflow)/sign-up/FlowController/SuccessErrorScreen";

type ErrorsScreenProps = {
  errors: string[];
  errorMessage: string;
};

export const ErrorsScreen = ({ errors, errorMessage }: ErrorsScreenProps) => {
  const theme = useContext(ThemeContext);
  const errorColor = theme.importModal.error;
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  return (
    <ScrollableContentStyled>
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
    </ScrollableContentStyled>
  );
};

export const SpinnerScreen = () => (
  <ScreenWrapperStyled>
    <Spinner />
  </ScreenWrapperStyled>
);

export const SuccessScreen = () => {
  const { t, dict } = useTranslate("ImportModal");
  return (
    <SuccessWrapperStyled>
      <ScreenCircleStyled success={true}>
        <IconStyled icon={"done"} iconSize={56} />
      </ScreenCircleStyled>
      <StyledHeader>{t(dict.successHeader)}</StyledHeader>
      <StyledSubHeader>{t(dict.successSubHeader)}</StyledSubHeader>
    </SuccessWrapperStyled>
  );
};

type ImportCSVInstructionScreenProps = {
  exampleHeader: string;
  exampleFirstLine: string;
};

export const ImportCSVInstructionScreen = ({
  exampleHeader,
  exampleFirstLine,
}: ImportCSVInstructionScreenProps) => {
  const { t, dict } = useTranslate("ImportModal");
  const theme = useContext(ThemeContext);
  const firstLineColor = theme.importModal.HLFirstLine;
  const correctDataColor = theme.importModal.HLCorrectData;

  return (
    <InstructionWrapperStyled>
      <PStyled>{t(dict.instruction.wantToUpload)}</PStyled>
      <PStyled>
        {t(dict.instruction.correctFile)}
        <SpanStyled color={firstLineColor}>
          {t(dict.instruction.HLFirstLine)}
        </SpanStyled>
        {t(dict.instruction.subsequentLines)}
        <SpanStyled color={correctDataColor}>
          {t(dict.instruction.HLCorrectData)}
        </SpanStyled>
        {t(dict.instruction.eachLine)}
      </PStyled>
      <PStyled>{t(dict.instruction.example)}</PStyled>
      <PStyled color={firstLineColor}>{exampleHeader}</PStyled>
      <PStyled color={correctDataColor}>{exampleFirstLine}</PStyled>
      <PStyled>{t(dict.instruction.useComas)}</PStyled>
    </InstructionWrapperStyled>
  );
};

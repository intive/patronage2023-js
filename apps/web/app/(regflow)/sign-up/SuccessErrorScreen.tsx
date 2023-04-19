"use client";

import { useTranslate } from "lib/hooks";
import styled from "styled-components";
import { Icon, LinkComponent, ButtonStyled } from "ui";
import { FormWrapper, StyledHeader, StyledSubHeader } from "./SignUpFormStyled";

type SuccessType = {
  success: boolean;
};
type SuccessErrorScreenProps = {
  onBackToStart: () => void;
  loginHref: string;
} & SuccessType &
  React.HTMLProps<HTMLDivElement>;

const ScreenStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScreenCircle = styled.div<SuccessType>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 32px;
  background: ${({ success, theme }) =>
    success ? theme.signUp.main : theme.signUp.error};
`;

const IconStyled = styled(Icon)`
  color: ${({ theme }) => theme.signUp.icon};
  font-weight: 700;
`;

const LinkStyled = styled(LinkComponent)`
  margin-top: 136px;
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.button.primary.main};
  color: ${({ theme }) => theme.signUp.link};
  background-color: ${({ theme }) => theme.button.primary.main};

  @media only screen and (min-width: 1024px) {
    margin-top: 96px;
  }
`;

export const SuccessErrorScreen = ({
  success,
  onBackToStart,
  loginHref,
}: SuccessErrorScreenProps) => {
  const { dict, t } = useTranslate("SignUpPage");
  const {
    successErrorScreen: { status },
  } = dict;

  const statusHeaderText = success
    ? t(status.success.header)
    : t(status.error.header);
  const statusSubheaderText = success
    ? t(status.success.subheader)
    : t(status.error.subheader);
  const statusButtonText = success
    ? t(status.success.button)
    : t(status.error.button);

  return (
    <FormWrapper center>
      <ScreenStatusWrapper>
        <ScreenCircle success={success}>
          <IconStyled icon={success ? "done" : "priority_high"} iconSize={56} />
        </ScreenCircle>
        <StyledHeader>{statusHeaderText}</StyledHeader>
        <StyledSubHeader>{statusSubheaderText}</StyledSubHeader>
      </ScreenStatusWrapper>
      {success ? (
        <ButtonStyled as={LinkStyled} fullWidth href={loginHref}>
          {statusButtonText}
        </ButtonStyled>
      ) : (
        <ButtonStyled as={LinkStyled} fullWidth onClick={onBackToStart}>
          {statusButtonText}
        </ButtonStyled>
      )}
    </FormWrapper>
  );
};

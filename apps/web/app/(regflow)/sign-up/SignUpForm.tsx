"use client";

import { Button, Input } from "ui";
import styled from "styled-components";
import { useTranslate } from "lib/hooks";

const FormWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 24px;
  width: 312px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 767px) {
    width: 416px;
  }
`;

export const SignUpForm = () => {
  const { dict, t } = useTranslate("SignUpPage");
  return (
    <FormWrapper>
      <p>{t(dict.paragraph)}</p>
      <Input name="email" label="Email" />
      <Button onClick={() => {}} type="submit" fullWidth>
        Log In
      </Button>
    </FormWrapper>
  );
};

"use client";

import { Field, Form } from "houseform";
import { Button, Input, LinkComponent } from "ui";
import styled from "styled-components";
import { z } from "zod";
import { useTranslate } from "lib/hooks";

type EmailScreenProps = {
  onNext: (password: string) => void;
};

const StyledForm = styled.form`
  display: flex;
  margin: 0 auto;
  gap: 24px;
  width: 312px;
  height: 542px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 767px) {
    width: 416px;
  }
`;

const FooterStyled = styled.div`
  font-size: 16px;
  line-height: 150%;
  font-weight: 400;
  margin-top: 42px;
`;

export const EmailScreen = ({ onNext }: EmailScreenProps) => {
  const { t, dict } = useTranslate("SignUpPage");
  const { emailScreen } = dict;

  return (
    <Form
      onSubmit={(values) => {
        onNext(values.email);
      }}>
      {({ submit }) => (
        <StyledForm
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <Field
            name="email"
            initialValue={""}
            onChangeValidate={z
              .string()
              .email(t(emailScreen.invalidEmailError))}>
            {({ value, setValue, errors }) => (
              <Input
                name="email"
                type="email"
                label={t(emailScreen.inputLabel)}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onInputCleared={() => setValue("")}
                hasError={errors.length > 0}
                supportingLabel={errors.length ? errors : undefined}
              />
            )}
          </Field>
          <Button onClick={submit} type="submit" fullWidth>
            {t(emailScreen.buttonNext)}
          </Button>
          <FooterStyled>
            {t(emailScreen.footer)}{" "}
            <LinkComponent href="/sign-in">
              {t(emailScreen.footerLink)}
            </LinkComponent>
          </FooterStyled>
        </StyledForm>
      )}
    </Form>
  );
};

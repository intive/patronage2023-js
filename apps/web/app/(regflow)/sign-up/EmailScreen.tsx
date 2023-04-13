"use client";

import { Field, Form } from "houseform";
import { Button, Input, LinkComponent } from "ui";
import styled from "styled-components";
import { z } from "zod";
import { useTranslate } from "lib/hooks";
import { FormWrapper } from "./SignUpFormStyled";

type EmailScreenProps = {
  onNext: (email: string) => void;
  userInfo?: string;
};

const FooterStyled = styled.div`
  font-size: 16px;
  line-height: 150%;
  margin-top: 42px;
  font-family: "Inter", sans-serif;
`;

export const EmailScreen = ({ onNext, userInfo = "" }: EmailScreenProps) => {
  const { t, dict } = useTranslate("SignUpPage");
  const { emailScreen } = dict;

  return (
    <Form
      onSubmit={(values) => {
        onNext(values.email);
      }}>
      {({ submit }) => (
        <FormWrapper
          center
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <Field
            name="email"
            initialValue={userInfo}
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
        </FormWrapper>
      )}
    </Form>
  );
};

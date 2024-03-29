"use client";

import { Field, Form } from "houseform";
import { Button, Input, FormFooter } from "ui";
import { z } from "zod";
import { useTranslate } from "lib/hooks";
import { FormWrapper } from "./SignUpFormStyled";

type EmailScreenProps = {
  onNext: (email: string) => void;
  userInfo?: string;
};

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
          <FormFooter
            basicText={t(emailScreen.footer)}
            linkText={t(emailScreen.footerLink)}
            href="/sign-in"
          />
        </FormWrapper>
      )}
    </Form>
  );
};

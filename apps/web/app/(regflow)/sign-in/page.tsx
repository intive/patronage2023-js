"use client";

import { Field, Form } from "houseform";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Button, Input, FormFooter } from "ui";
import styled from "styled-components";
import { z } from "zod";
import { useTranslate } from "lib/hooks";
import { signIn } from "next-auth/react";
import { FormWrapperStyle } from "../sign-up/FlowController/SignUpFormStyled";

const FormWrapper = styled.div`
  ${FormWrapperStyle}
  position: relative;
  flex-direction: column;
  justify-content: center;
`;

const FieldsWrapper = styled.div`
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 5rem;
`;

const ErrorWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ErrorSuportingMsg = styled.div`
  position: absolute;
  top: 60px;
  left: 10px;
  color: #b3261e;
  font-size: small;
`;

export default function SignInPage() {
  const router = useRouter();
  const { t, dict } = useTranslate("SignInPage");
  const { form } = dict;
  const [errMsg, setErrMsg] = useState("");

  const closeErrorMessage = () => {
    setErrMsg("");
  };

  return (
    <Form
      onSubmit={(values) => {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        }).then((res) => {
          if (res?.ok) {
            router.refresh();
            router.push("/");
          } else {
            setErrMsg(t(form.errorMessage));
          }
        });
      }}>
      {({ submit }) => (
        <FormWrapper>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}>
            {errMsg && (
              <ErrorWrapper>
                <ErrorMessage message={errMsg} onClose={closeErrorMessage} />
              </ErrorWrapper>
            )}
            <FieldsWrapper>
              <Field
                name="email"
                initialValue={""}
                onBlurValidate={z
                  .string()
                  .email(t(form.emailInput.wrongFormatError))}>
                {({ value, setValue, onBlur, errors }) => (
                  <InputWrapper>
                    <Input
                      name="email"
                      label={t(form.emailInput.label)}
                      value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}
                      onFocus={closeErrorMessage}
                      onInputCleared={() => setValue("")}
                      onBlur={onBlur}
                      hasError={errors.length > 0}
                    />
                    {errors.map((error) => (
                      <ErrorSuportingMsg key={error}>{error}</ErrorSuportingMsg>
                    ))}
                  </InputWrapper>
                )}
              </Field>
              <Field
                name="password"
                initialValue={""}
                onBlurValidate={z
                  .string()
                  .min(3, t(form.passwordInput.min3CharactersError))}>
                {({ value, setValue, onBlur, errors }) => (
                  <InputWrapper>
                    <Input
                      name="password"
                      type="password"
                      label={t(form.passwordInput.label)}
                      value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}
                      onFocus={closeErrorMessage}
                      onBlur={onBlur}
                      hasError={errors.length > 0}
                    />
                    {errors.map((error) => (
                      <ErrorSuportingMsg key={error}>{error}</ErrorSuportingMsg>
                    ))}
                  </InputWrapper>
                )}
              </Field>
            </FieldsWrapper>
            <Button type="submit" fullWidth>
              {t(form.submitButton)}
            </Button>
            <FormFooter
              basicText={t(form.footer)}
              linkText={t(form.footerLink)}
              href="/sign-up"
            />
          </form>
        </FormWrapper>
      )}
    </Form>
  );
}

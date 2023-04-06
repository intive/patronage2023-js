"use client";
import { useTranslate } from "lib/hooks";
import styled from "styled-components";
import { device } from "lib/css-variables";
import { Button, Input, Separator } from "ui";
import { z } from "zod";
import { Field, Form } from "houseform";

export const PasswordSubComponent = ({ next, back, onSubmit }) => {
  const { t, dict } = useTranslate("SignUpPage");
  const { passwordComponent } = dict;

  const FormWrapper = styled.div`
    display: flex;
    height: 542px;
    width: 416px;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
  `;

  const StyledHeader = styled.h2`
    color: ${({ theme }) => theme.text.header};
    font-family: "Signika", sans-serif;
    font-size: 24px;

    @media ${device.desktop} {
      margin-top: 32px;
    }
  `;

  return (
    <>
      <FormWrapper>
        <StyledHeader>{t(passwordComponent.mainHeader)}</StyledHeader>
        <h3>{t(passwordComponent.subHeader)}</h3>
        <Separator />
        <p>{t(passwordComponent.requirementsHeader)}</p>
        <ul>
          <li>{t(passwordComponent.requirementUpperCase)}</li>
          <li>{t(passwordComponent.requirementLowerCase)}</li>
          <li>{t(passwordComponent.requirementSpecialCharacter)}</li>
          <li>{t(passwordComponent.requirementNoSpace)}</li>
          <li>{t(passwordComponent.requirementLength)}</li>
        </ul>
        <Form
          onSubmit={(values, form) => {
            console.log("Yay");
          }}>
          {({ isValid, submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <Field
                name="password"
                onSubmitValidate={z
                  .string()
                  .min(12, t(passwordComponent.inputErrors.longCheck))
                  .regex(
                    /[A-Z]/,
                    t(passwordComponent.inputErrors.missingUpperCase)
                  )
                  .regex(
                    /[a-z]/,
                    t(passwordComponent.inputErrors.missingLowerCase)
                  )
                  .regex(
                    /[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/,
                    t(passwordComponent.inputErrors.missingSpecialCharacter)
                  )
                  .regex(/^\S+$/, t(passwordComponent.inputErrors.spacesCheck))}
                onChangeValidate={z.string()}>
                {({ value, setValue, errors, isValid }) => {
                  return (
                    <>
                      <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        label={t(passwordComponent.inputPlaceholderPassword)}
                        hasError={!isValid}
                        supportingLabel={!isValid ? errors[0] : ""}
                        type="password"
                      />
                    </>
                  );
                }}
              </Field>
              <Field
                name="passwordConfirmation"
                listenTo={["password"]}
                onSubmitValidate={(val, form) => {
                  if (val === form.getFieldValue("password")!.value) {
                    return Promise.resolve(true);
                  } else {
                    return Promise.reject(
                      t(passwordComponent.inputErrors.matchError)
                    );
                  }
                }}
                onChangeValidate={z.string()}>
                {({ value, setValue, errors }) => {
                  return (
                    <>
                      <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        label={t(
                          passwordComponent.inputPlaceholderRepeatPassword
                        )}
                        hasError={!isValid}
                        supportingLabel={!isValid ? errors[0] : ""}
                        type="password"
                      />
                    </>
                  );
                }}
              </Field>
              <Button
                onClick={() => console.log("Wracamy")}
                variant="secondary">
                Back
              </Button>
              <Button onClick={submit}>Submit</Button>
            </form>
          )}
        </Form>
      </FormWrapper>
    </>
  );
};

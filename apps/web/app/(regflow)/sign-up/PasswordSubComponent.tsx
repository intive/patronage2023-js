"use client";
import { useTranslate } from "lib/hooks";
import styled from "styled-components";
import { device } from "lib/css-variables";
import { Input, Separator } from "ui";
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
          onSubmit={(values) => {
            console.log(JSON.stringify(values));
          }}>
          {({ isValid, submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}>
              <Field name="password">
                {({ value, setValue, onBlur }) => {
                  return (
                    <>
                      <input value={value} />
                    </>
                  );
                }}
              </Field>
              <Field name="passwordConfirmation">
                {({ value, setValue, onBlur }) => {
                  return (
                    <>
                      <input value={value} />
                    </>
                  );
                }}
              </Field>
            </form>
          )}
        </Form>
      </FormWrapper>
    </>
  );
};

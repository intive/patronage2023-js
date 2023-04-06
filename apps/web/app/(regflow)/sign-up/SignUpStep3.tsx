"use client";
import { useTranslate } from "lib/hooks";
import { Form, Field } from "houseform";
import { device } from "lib/css-variables";
import styled from "styled-components";
import { z } from "zod";
import { Separator, Input, Button, AvatarSelector } from "ui";
import { useState } from "react";

const H3Styled = styled.h3`
  color: ${({ theme }) => theme.signUp.main};
  font-family: "Signika", sans-serif;
  font-size: 24px;
  line-height: 1.5em;
`;

const SubtitleStyled = styled.p`
  color: ${({ theme }) => theme.signUp.secondary};
  font-size: 14px;

  @media ${device.desktop} {
    font-size: 16px;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FormWrapper = styled.div`
  width: 100%;
`;

const FieldsWrapper = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 3em;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const CreateBtnWrapper = styled.div`
  flex-grow: 1;
  margin-left: 1em;
`;

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.signUp.accent};
  margin: 2em 0;
`;

const AvatarStyled = styled.div`
  height: 150px;
  width: 100%;
  border: 1px solid red;
  margin-bottom: 2em;
`;

function checkValue(string: string): any {
  console.log(string.length > 0);
  return string.length > 0;
}

export const SignUpStep3 = () => {
  const { dict, t } = useTranslate("SignUpPage");
  const { step3 } = dict;
  const [selected, setSelected] = useState("1");

  return (
    <>
      <StepWrapper>
        <H3Styled>{t(step3.title)}</H3Styled>
        <SubtitleStyled>{t(step3.subtitle)}</SubtitleStyled>
        <SeparatorLine />
        <AvatarSelector
          avatars={[
            {
              id: "1",
              src: "/avatars/1.svg",
            },
            {
              id: "2",
              src: "/avatars/2.svg",
            },
            {
              id: "3",
              src: "/avatars/3.svg",
            },
            {
              id: "4",
              src: "/avatars/4.svg",
            },
            {
              id: "5",
              src: "/avatars/5.svg",
            },
            {
              id: "6",
              src: "/avatars/6.svg",
            },
            {
              id: "7",
              src: "/avatars/7.svg",
            },
            {
              id: "8",
              src: "/avatars/8.svg",
            },
          ]}
          selectedAvatar={selected}
          onSelect={setSelected}
        />
        <FormWrapper>
          <Form
            onSubmit={(values) => {
              console.log(values, selected);
            }}>
            {({ submit, errors }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}>
                <FieldsWrapper>
                  <Field
                    onChangeValidate={z
                      .string()
                      .min(1, t(step3.lastNameInput.error))}
                    name="firstName"
                    initialValue={""}>
                    {({ value, setValue, onBlur, errors }) => (
                      <Input
                        name="firstName"
                        label={t(step3.firstNameInput.label)}
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        onInputCleared={() => setValue("")}
                        onBlur={onBlur}
                        hasError={errors.length > 0}
                        supportingLabel={errors}
                      />
                    )}
                  </Field>
                  <Field
                    onChangeValidate={z
                      .string()
                      .min(1, t(step3.lastNameInput.error))}
                    name="lastName"
                    initialValue={""}>
                    {({ value, setValue, onBlur, errors }) => (
                      <Input
                        name="lastName"
                        label={t(step3.lastNameInput.label)}
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        onBlur={onBlur}
                        onInputCleared={() => setValue("")}
                        hasError={errors.length > 0}
                        supportingLabel={errors}
                      />
                    )}
                  </Field>
                </FieldsWrapper>

                <ButtonsWrapper>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Going Back");
                    }}>
                    {t(step3.backButton)}
                  </Button>
                  <CreateBtnWrapper>
                    <Button fullWidth onClick={submit}>
                      {t(step3.submitButton)}
                    </Button>
                  </CreateBtnWrapper>
                </ButtonsWrapper>
              </form>
            )}
          </Form>
        </FormWrapper>
      </StepWrapper>
    </>
  );
};

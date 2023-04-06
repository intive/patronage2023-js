"use client";
import { useTranslate } from "lib/hooks";
import { Form, Field } from "houseform";
import { device } from "lib/css-variables";
import styled from "styled-components";
import { z } from "zod";
import { Separator, Input, Button } from "ui";

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

  return (
    <>
      <StepWrapper>
        <H3Styled>{t(step3.title)}</H3Styled>
        <SubtitleStyled>{t(step3.subtitle)}</SubtitleStyled>
        <SeparatorLine />
        <AvatarStyled>Avatar Picker</AvatarStyled>
        <FormWrapper>
          <Form
            onSubmit={(values) => {
              console.log(values)
            }}>
            {({ submit, errors }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}>
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
                  <Button fullWidth onClick={submit}>{t(step3.submitButton)}</Button>
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

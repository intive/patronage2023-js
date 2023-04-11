"use client";
import { useTranslate } from "lib/hooks";
import { Form, Field } from "houseform";
import { device } from "lib/media-queries";
import styled from "styled-components";
import { z } from "zod";
import { Input, Button, AvatarSelector } from "ui";
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

  ${device.tablet} {
    font-size: 16px;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  margin-top: 1em;
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

const AvatarsWrapper = styled.div`
  width: 350px;
  margin-left: -2em;
  margin-right: -2em;
  margin-bottom: 2em;

  ${device.tablet} {
    width: 100%;
    max-width: 480px;
    min-width: 350px;
    margin: 0;
    margin-bottom: 2em;
  }
`;

type ProfileScreenProps = {
  back: () => void;
  done: () => void;
} & React.HTMLProps<HTMLDivElement>;

export const ProfileScreen = ({ back, done }: ProfileScreenProps) => {
  const { dict, t } = useTranslate("SignUpPage");
  const { step3 } = dict;
  const [selectedAvatar, setSelectedAvatar] = useState("1");

  return (
    <>
      <StepWrapper>
        <H3Styled>{t(step3.title)}</H3Styled>
        <SubtitleStyled>{t(step3.subtitle)}</SubtitleStyled>
        <SeparatorLine />
        <AvatarsWrapper>
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
            selectedAvatar={selectedAvatar}
            onSelect={setSelectedAvatar}
          />
        </AvatarsWrapper>
        <Form
          onSubmit={(values) => {
            console.log(values, selectedAvatar);
            alert(
              `Imię: ${values.firstName} Nazwisko: ${values.lastName} Avatar: ${selectedAvatar}`
            );
          }}>
          {({ submit }) => (
            <StyledForm
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
                    supportingLabel={errors.length ? errors : null}
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
                    supportingLabel={errors.length ? errors : null}
                  />
                )}
              </Field>
              <ButtonsWrapper>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Going Back");
                  }}>
                  {t(step3.backButton)}
                </Button>
                <CreateBtnWrapper>
                  <Button fullWidth onClick={submit}>
                    {t(step3.submitButton)}
                  </Button>
                </CreateBtnWrapper>
              </ButtonsWrapper>
            </StyledForm>
          )}
        </Form>
      </StepWrapper>
    </>
  );
};

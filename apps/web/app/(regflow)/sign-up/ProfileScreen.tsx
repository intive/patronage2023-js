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
  text-align: center;
`;

const SubtitleStyled = styled.p`
  color: ${({ theme }) => theme.signUp.text};
  font-size: 14px;
  text-align: center;

  ${device.tablet} {
    font-size: 16px;
  }
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
  gap: 16px;
`;

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.signUp.accent};
  margin: 2em 0;
`;

type ProfileScreenProps = {
  back: () => void;
  done: (profileInfo: {
    firstName: string;
    lastName: string;
    avatar: string;
  }) => void;
  profileData: { firstName: string; lastName: string; avatar: string };
} & React.HTMLProps<HTMLDivElement>;

export const ProfileScreen = ({
  back,
  done,
  profileData,
}: ProfileScreenProps) => {
  const { dict, t } = useTranslate("SignUpPage");
  const { profileScreen } = dict;
  const [selectedAvatar, setSelectedAvatar] = useState("1");

  return (
    <>
      <Form
        onSubmit={(values) => {
          const profileInfo = {
            firstName: values.firstName,
            lastName: values.lastName,
            avatar: selectedAvatar,
          };
          console.log(profileInfo);
          //done(profileInfo)
        }}>
        {({ submit }) => (
          <StyledForm
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}>
            <H3Styled>{t(profileScreen.title)}</H3Styled>
            <SubtitleStyled>{t(profileScreen.subtitle)}</SubtitleStyled>
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
              selectedAvatar={selectedAvatar}
              onSelect={setSelectedAvatar}
            />
            <Field
              onChangeValidate={z
                .string()
                .min(1, t(profileScreen.inputErrorMsg))}
              name="firstName"
              initialValue={""}>
              {({ value, setValue, onBlur, errors }) => (
                <Input
                  name="firstName"
                  label={t(profileScreen.firstNameInputLabel)}
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
                .min(1, t(profileScreen.inputErrorMsg))}
              name="lastName"
              initialValue={""}>
              {({ value, setValue, onBlur, errors }) => (
                <Input
                  name="lastName"
                  label={t(profileScreen.lastNameInputLabel)}
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
                  //back()
                }}>
                {t(profileScreen.backButton)}
              </Button>
              <Button fullWidth onClick={submit}>
                {t(profileScreen.submitButton)}
              </Button>
            </ButtonsWrapper>
          </StyledForm>
        )}
      </Form>
    </>
  );
};

"use client";

import { useTranslate } from "lib/hooks";
import { Form, Field } from "houseform";
import { device } from "lib/media-queries";
import styled from "styled-components";
import { z } from "zod";
import { Input, Button, AvatarSelector, Separator } from "ui";
import { useState } from "react";
import {
  ButtonWrapper,
  FormWrapper,
  StyledHeader,
  StyledSubHeader,
} from "./SignUpFormStyled";

type ProfileScreenProps = {
  onBack: () => void;
  done: (profileInfo: {
    firstName: string;
    lastName: string;
    avatar: string;
  }) => void;
  userInfo: { firstName: string; lastName: string; avatar: string };
} & React.HTMLProps<HTMLDivElement>;

export const ProfileScreen = ({
  onBack,
  done,
  userInfo,
}: ProfileScreenProps) => {
  const { dict, t } = useTranslate("SignUpPage");
  const { profileScreen } = dict;
  const [selectedAvatar, setSelectedAvatar] = useState("1");

  return (
    <Form
      onSubmit={(values) => {
        const profileInfo = {
          firstName: values.firstName,
          lastName: values.lastName,
          avatar: selectedAvatar,
        };

        done(profileInfo);
      }}>
      {({ submit }) => (
        <FormWrapper
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <StyledHeader>{t(profileScreen.title)}</StyledHeader>
          <StyledSubHeader>{t(profileScreen.subtitle)}</StyledSubHeader>
          <Separator />
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
            selectedAvatar={userInfo.avatar || selectedAvatar}
            onSelect={setSelectedAvatar}
          />
          <Field
            onChangeValidate={z.string().min(1, t(profileScreen.inputErrorMsg))}
            name="firstName"
            initialValue={userInfo.firstName || ""}>
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
            onChangeValidate={z.string().min(1, t(profileScreen.inputErrorMsg))}
            name="lastName"
            initialValue={userInfo.lastName || ""}>
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
          <ButtonWrapper>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}>
              {t(profileScreen.backButton)}
            </Button>
            <Button fullWidth onClick={submit}>
              {t(profileScreen.submitButton)}
            </Button>
          </ButtonWrapper>
        </FormWrapper>
      )}
    </Form>
  );
};

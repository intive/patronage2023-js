"use client";

import { useTranslate } from "lib/hooks";
import { Form, Field } from "houseform";
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
  const [selectedAvatar, setSelectedAvatar] = useState("/avatars/1.svg");

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
              "/avatars/1.svg",
              "/avatars/2.svg",
              "/avatars/3.svg",
              "/avatars/4.svg",
              "/avatars/5.svg",
              "/avatars/6.svg",
              "/avatars/7.svg",
              "/avatars/8.svg",
            ]}
            selectedAvatar={selectedAvatar}
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

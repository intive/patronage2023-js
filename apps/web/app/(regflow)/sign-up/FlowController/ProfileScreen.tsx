"use client";

import { useTranslate } from "lib/hooks";
import { Form, Field } from "houseform";
import { z } from "zod";
import { Input, Button, AvatarSelector, NavBudgetIcon } from "ui";
import { useCallback, useState } from "react";
import {
  ButtonWrapper,
  CroppSectionButtonWrapper,
  CustomSectionWrapper,
  FormWrapper,
  StyledHeader,
  StyledSubHeader,
  SwitcherWrapper,
  ButtonGroupStyled,
} from "./SignUpFormStyled";
import StyledDropzone, { Container } from "components/Dropzone";
import ImageCropperModal from "components/ImageCropperModal";
import Image from "next/image";
import { StyledSpan } from "components/ImageCropperModal/ImageCropper.styled";

type ProfileScreenProps = {
  onBack: () => void;
  done: (
    profileInfo: {
      firstName: string;
      lastName: string;
      avatar: string;
    },
    blob?: File
  ) => void;
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
  const [customAvatar, setCustomAvatar] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState("");
  const [modal, setModal] = useState(false);
  const [blob, setBlob] = useState<File>();

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setModal(true);
      setImageSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, []);

  return (
    <Form
      onSubmit={(values) => {
        const profileInfo = {
          firstName: values.firstName,
          lastName: values.lastName,
          avatar: selectedAvatar,
        };

        done(profileInfo, blob);
      }}>
      {({ submit }) => (
        <FormWrapper
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <StyledHeader>{t(profileScreen.title)}</StyledHeader>
          <StyledSubHeader>{t(profileScreen.subtitle)}</StyledSubHeader>
          <SwitcherWrapper>
            <ButtonGroupStyled
              secondary
              options={[
                {
                  component: t(profileScreen.avatarSwitcherDefault),
                  onSelect: () => {
                    setCustomAvatar(false);
                  },
                  defaultChecked: true,

                  id: "default",
                },
                {
                  component: t(profileScreen.avatarSwitcherCustom),
                  onSelect: () => {
                    setCustomAvatar(true);
                  },
                  id: "custom",
                },
              ]}
            />
          </SwitcherWrapper>
          {customAvatar ? (
            <CustomSectionWrapper>
              {croppedImage ? (
                <Container>
                  <Image
                    src={croppedImage}
                    alt="blob"
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "100%",
                    }}
                  />
                  <CroppSectionButtonWrapper>
                    <NavBudgetIcon
                      onClick={() => {
                        setModal(true);
                      }}
                      icon={"edit"}
                    />
                    <NavBudgetIcon
                      onClick={() => {
                        setCroppedImage("");
                        setImageSrc("");
                      }}
                      icon={"delete"}
                    />
                  </CroppSectionButtonWrapper>
                </Container>
              ) : (
                <>
                  <StyledDropzone handleDrop={handleDrop} />
                </>
              )}
              {imageSrc && modal && (
                <ImageCropperModal
                  closeModal={() => setModal(false)}
                  imageSrc={imageSrc}
                  setCroppedImage={setCroppedImage}
                  setBlob={setBlob}
                />
              )}
            </CustomSectionWrapper>
          ) : (
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
          )}

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

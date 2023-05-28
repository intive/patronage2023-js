"use client";

import { useTranslate } from "lib/hooks";
import styled from "styled-components";
import { Button, Input, Separator } from "ui";
import { z } from "zod";
import { Field, Form } from "houseform";
import {
  ButtonWrapper,
  FormWrapper,
  StyledHeader,
  StyledSubHeader,
} from "./SignUpFormStyled";

type PasswordSubComponentProps = {
  onNext: (password: string) => void;
  onBack: () => void;
  userInfo?: string;
};

const ListHeader = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.primary};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > * {
    flex-basis: 85px;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  min-height: 150px;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 16px;
`;

const UnorderedListWrapper = styled.ul`
  list-style: none;

  & > li {
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMiIgdmlld0JveD0iMCAwIDEwIDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjQ1ODY2IDEuOTc5MDhDMS4xODA4OCAxLjk3OTA4IDAuOTQ4MjQyIDEuODg1MzMgMC43NjA3NDIgMS42OTc4M0MwLjU3MzI0MiAxLjUxMDMzIDAuNDc5NDkyIDEuMjc3NyAwLjQ3OTQ5MiAwLjk5OTkxOEMwLjQ3OTQ5MiAwLjcyMjE0MSAwLjU3MzI0MiAwLjQ4OTUwMiAwLjc2MDc0MiAwLjMwMjAwMkMwLjk0ODI0MiAwLjExNDUwMiAxLjE4MDg4IDAuMDIwNzUyIDEuNDU4NjYgMC4wMjA3NTJIOC41NDE5OUM4LjgxOTc3IDAuMDIwNzUyIDkuMDUyNDEgMC4xMTQ1MDIgOS4yMzk5MSAwLjMwMjAwMkM5LjQyNzQxIDAuNDg5NTAyIDkuNTIxMTYgMC43MjIxNDEgOS41MjExNiAwLjk5OTkxOEM5LjUyMTE2IDEuMjc3NyA5LjQyNzQxIDEuNTEwMzMgOS4yMzk5MSAxLjY5NzgzQzkuMDUyNDEgMS44ODUzMyA4LjgxOTc3IDEuOTc5MDggOC41NDE5OSAxLjk3OTA4SDEuNDU4NjZaIiBmaWxsPSIjNjRCQTk1Ii8+Cjwvc3ZnPgo=")
      no-repeat left center;
    padding: 5px 10px 5px 25px;
    font-size: 14px;
    color: ${({ theme }) => theme.secondary};
  }
`;

export const PasswordSubComponent = ({
  onNext,
  onBack,
  userInfo = "",
}: PasswordSubComponentProps) => {
  const { t, dict } = useTranslate("SignUpPage");
  const { passwordComponent } = dict;

  const validationSchema = z
    .string()
    .min(12, t(passwordComponent.inputErrors.longCheck))
    .regex(/[A-Z]/, t(passwordComponent.inputErrors.missingUpperCase))
    .regex(/[a-z]/, t(passwordComponent.inputErrors.missingLowerCase))
    .regex(
      /[!"#$%&'()+,-./:;<=>?@[\]*^_`{|}~]/,
      t(passwordComponent.inputErrors.missingSpecialCharacter)
    )
    .regex(/^\S+$/, t(passwordComponent.inputErrors.spacesCheck));

  return (
    <FormWrapper>
      <div>
        <StyledHeader>{t(passwordComponent.mainHeader)}</StyledHeader>
        <StyledSubHeader>{t(passwordComponent.subHeader)}</StyledSubHeader>
      </div>
      <Separator />
      <ListWrapper>
        <ListHeader>{t(passwordComponent.requirementsHeader)}</ListHeader>
        <UnorderedListWrapper>
          <li>{t(passwordComponent.requirementUpperCase)}</li>
          <li>{t(passwordComponent.requirementLowerCase)}</li>
          <li>{t(passwordComponent.requirementSpecialCharacter)}</li>
          <li>{t(passwordComponent.requirementNoSpace)}</li>
          <li>{t(passwordComponent.requirementLength)}</li>
        </UnorderedListWrapper>
      </ListWrapper>
      <Form
        onSubmit={(values) => {
          onNext(values.password);
        }}>
        {({ isValid, submit }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <InputWrapper>
              <Field
                name="password"
                initialValue={userInfo}
                onSubmitValidate={validationSchema}
                onChangeValidate={z.string()}>
                {({ value, setValue, errors, isValid }) => {
                  return (
                    <>
                      <Input
                        name="password"
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
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
                initialValue={userInfo}
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
                        name="passwordConfirmation"
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
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
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={onBack} variant="secondary">
                {t(passwordComponent.buttonBack)}
              </Button>
              <Button fullWidth onClick={submit}>
                {t(passwordComponent.buttonNext)}
              </Button>
            </ButtonWrapper>
          </form>
        )}
      </Form>
    </FormWrapper>
  );
};

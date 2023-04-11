"use client";
import { useTranslate } from "lib/hooks";
import styled from "styled-components";
import { device } from "lib/css-variables";
import { Button, Input, Separator } from "ui";
import { z } from "zod";
import { Field, Form } from "houseform";

type PasswordSubComponentProps = {
  onNext: (password: string) => void;
  onBack: () => void;
};

export const PasswordSubComponent = ({
  onNext,
  onBack,
}: PasswordSubComponentProps) => {
  const { t, dict } = useTranslate("SignUpPage");
  const { passwordComponent } = dict;

  const StyledSubmitButton = styled(Button)`
    width: 75%;
  `;

  const StyledBackButton = styled(Button)`
    width: 23%;
  `;

  const StyledHeader = styled.h2`
    color: ${({ theme }) => theme.text.header};
    font-family: "Signika", sans-serif;
    font-size: 1.5em;
    text-align: center;
  `;

  const StyledSubHeader = styled.h3`
    margin-top: 4px;
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    text-align: center;
    color: ${({ theme }) => theme.text.paragraph};
  `;

  const ListHeader = styled.p`
    font-family: "Inter", sans-serif;
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.text.header};
  `;

  const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    & > * {
      flex-basis: 85px;
    }
  `;

  const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
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
      font-family: "Inter", sans-serif;
      background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMiIgdmlld0JveD0iMCAwIDEwIDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjQ1ODY2IDEuOTc5MDhDMS4xODA4OCAxLjk3OTA4IDAuOTQ4MjQyIDEuODg1MzMgMC43NjA3NDIgMS42OTc4M0MwLjU3MzI0MiAxLjUxMDMzIDAuNDc5NDkyIDEuMjc3NyAwLjQ3OTQ5MiAwLjk5OTkxOEMwLjQ3OTQ5MiAwLjcyMjE0MSAwLjU3MzI0MiAwLjQ4OTUwMiAwLjc2MDc0MiAwLjMwMjAwMkMwLjk0ODI0MiAwLjExNDUwMiAxLjE4MDg4IDAuMDIwNzUyIDEuNDU4NjYgMC4wMjA3NTJIOC41NDE5OUM4LjgxOTc3IDAuMDIwNzUyIDkuMDUyNDEgMC4xMTQ1MDIgOS4yMzk5MSAwLjMwMjAwMkM5LjQyNzQxIDAuNDg5NTAyIDkuNTIxMTYgMC43MjIxNDEgOS41MjExNiAwLjk5OTkxOEM5LjUyMTE2IDEuMjc3NyA5LjQyNzQxIDEuNTEwMzMgOS4yMzk5MSAxLjY5NzgzQzkuMDUyNDEgMS44ODUzMyA4LjgxOTc3IDEuOTc5MDggOC41NDE5OSAxLjk3OTA4SDEuNDU4NjZaIiBmaWxsPSIjNjRCQTk1Ii8+Cjwvc3ZnPgo=")
        no-repeat left center;
      padding: 5px 10px 5px 25px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: ${({ theme }) => theme.text.paragraph};
    }
  `;

  const FormWrapper = styled.div`
    display: flex;
    height: 542px;
    width: 416px;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 30px 0;

    @media ${device.mobile} {
      width: 311px;
    }
  `;

  return (
    <>
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
                    .regex(
                      /^\S+$/,
                      t(passwordComponent.inputErrors.spacesCheck)
                    )}
                  onChangeValidate={z.string()}>
                  {({ value, setValue, errors, isValid }) => {
                    return (
                      <>
                        <Input
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
                <StyledBackButton onClick={onBack} variant="secondary">
                  {t(passwordComponent.buttonBack)}
                </StyledBackButton>
                <StyledSubmitButton onClick={submit}>
                  {t(passwordComponent.buttonNext)}
                </StyledSubmitButton>
              </ButtonWrapper>
            </form>
          )}
        </Form>
      </FormWrapper>
    </>
  );
};

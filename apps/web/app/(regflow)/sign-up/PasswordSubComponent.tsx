"use client";
import { useTranslate } from "lib/hooks";
import styled from "styled-components";
import { device } from "lib/css-variables";
import { Button, Input, Separator } from "ui";
import { z } from "zod";
import { Field, Form } from "houseform";

export const PasswordSubComponent = ({ next, back, onSubmit }) => {
  const { t, dict } = useTranslate("SignUpPage");
  const { passwordComponent } = dict;

  const StyledSubmitButton = styled(Button)`
    width: 75%;
  `;

  const StyledBackButton = styled(Button)`
    width: 23%;
  `;

  const StyledList = styled.ul`
    list-style-position: inside;
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
  `;

  const FormWrapper = styled.div`
    display: flex;
    height: 542px;
    width: 416px;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;

    @media ${device.mobile} {
      width: 311px;
    }
  `;

  const StyledHeader = styled.h2`
    color: ${({ theme }) => theme.text.header};
    font-family: "Signika", sans-serif;
    font-size: 24px;
    text-align: center;
  `;
  //TODO: Poprawić wyświetlanie separatora
  return (
    <>
      <FormWrapper>
        <StyledHeader>{t(passwordComponent.mainHeader)}</StyledHeader>
        <h3>{t(passwordComponent.subHeader)}</h3>
        {/*<Separator label="test" />*/}
        <p>{t(passwordComponent.requirementsHeader)}</p>
        <StyledList>
          <ListWrapper>
            <li>{t(passwordComponent.requirementUpperCase)}</li>
            <li>{t(passwordComponent.requirementLowerCase)}</li>
            <li>{t(passwordComponent.requirementSpecialCharacter)}</li>
            <li>{t(passwordComponent.requirementNoSpace)}</li>
            <li>{t(passwordComponent.requirementLength)}</li>
          </ListWrapper>
        </StyledList>
        <Form
          onSubmit={(values, form) => {
            console.log("Yay");
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
                          onChange={(e) => setValue(e.target.value)}
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
                          onChange={(e) => setValue(e.target.value)}
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
                <StyledBackButton
                  onClick={() => console.log("Wracamy")}
                  variant="secondary">
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

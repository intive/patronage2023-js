"use client";

import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { v1 as uuidv1 } from "uuid";

import {
  Button,
  CurrencySelect,
  CustomDatePicker,
  IconPicker,
  Input,
  Modal,
} from "ui";
import { IconType } from "ui/Icon";
import {
  TabsStyled,
  TabsTriggerStyled,
  ParagraphStyled,
  InputWrapperHalfStyled,
  InputWrapperFullStyled,
  InputWrapperFullFlex,
  TextareaStyled,
  SeparatorStyled,
  ButtonWrapperStyled,
  SeparatorStyledTop,
  IconPickerStyled,
  TextareaErrorStyled,
  TextAreaWrapperStyled,
  DatePickerWrapperStyled,
  DatePickerErrorStyled,
  ContentStyled,
  InputWrapperHalfStyledCurrency,
} from "./CreateNewBudget.styled";
import { Form, Field } from "houseform";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "./useValidateBudgetModal";
import * as Tabs from "@radix-ui/react-tabs";
import { LanguageContext } from "lib/contexts";

type NewBudget = {
  onClose?: Function;
};

type currencyType = {
  tag: string;
  locale?: string;
};

type newBudgetType = {
  name: string;
  limit: number | string;
  description: string;
  icon: string;
  dateStart: number | null;
  dateEnd: number | null;
  currency: currencyType;
};

const icons: IconType[] = [
  "savings",
  "directions_car",
  "payments",
  "subscriptions",
  "shopping_cart",
  "home",
  "wallet",
  "error",
  "help",
];

//mocked existing user budgets
export const loggedUserExistingBudgets = ["smutnarzaba", "frytki123"];
//mocked currency
export const acceptedCurrencies: Array<string> = ["USD", "PLN", "EUR", "GBP"];

export const CreateNewBudget = ({ onClose }: NewBudget) => {
  const [defaultValue, setDefaultValue] = useState("settings");
  const [selectedIcon, setSelectedIcon] = useState<IconType>("savings");
  const [lang, setLang] = useState<string>("en-US");

  const { t, dict } = useTranslate("AddNewBudgetModal");
  const { currentLang } = useContext(LanguageContext);

  const {
    checkNameOnChange,
    checkNameOnSubmit,
    checkCurrency,
    checkLimit,
    checkDescription,
    checkDate,
  } = useValidateBudgetModal("AddNewBudgetModal");

  const [newBudget, setNewBudget] = useState<newBudgetType>({
    name: "",
    limit: "",
    description: "",
    icon: selectedIcon,
    dateStart: null,
    dateEnd: null,
    currency: {
      tag: "USD",
      locale: lang,
    },
  });

  const onSelectStartDate = (date: Date | null) => {
    date
      ? setNewBudget({ ...newBudget, dateStart: date.getTime() })
      : setNewBudget({ ...newBudget, dateStart: null });
  };

  const onSelectEndDate = (date: Date | null) => {
    date
      ? setNewBudget({ ...newBudget, dateEnd: date.getTime() })
      : setNewBudget({ ...newBudget, dateEnd: null });
  };

  useEffect(() => {
    currentLang === "en" && setLang("en-US");
    currentLang === "pl" && setLang("pl-PL");
  }, [lang, currentLang]);

  const url = "https://inbudget-patronage-api-dev.azurewebsites.net/budgets";

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM0NzQ4ODAsImlhdCI6MTY4MzQ2NzY4MCwianRpIjoiNTI5NjhkNGUtMjQzMS00MDk3LWFiY2MtMTIwODNlNThhYzNhIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImNhNjZmMzA3LWFhZWEtNDBjMi1hZTIzLWE4ZjU3N2Q0YzYwZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImNhNjZmMzA3LWFhZWEtNDBjMi1hZTIzLWE4ZjU3N2Q0YzYwZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.TUfpflJMMULqAytGLF_-NmuCMlwOh_4egnF7WdwPWlbqy6IRhW9_CFDUzMMleTT766vKaIzesMJbvWFTodki7Mnh9Be-l9cwrUMzhVwrMgweNSZzWiGWs4S54-dzzaXftvBhlcqBY4Ao9e4_ujdKNLcunWHpAm23PixKVmz7wfG8r4Gd6TRlKLfaxU7_PiDf_xK5ElFsH6Q92QYKY32m4iUyi_LIhkGcCvwsETFydCuXb9nOihJ6iVzqjZ7uiVcZ04ZemqMvp5DIhVAYeYqFqgLTQVgOf2nGQmTVyuB6EKAKeRo3SgmFxqbutDFHmbwtYQd88C0fleJZjoz4-78RfA";

  const useSendBudget = () =>
    useMutation(
      (post) =>
        fetch(url, {
          method: "POST",
          headers: {
            accept: "text/plain",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: `${uuidv1()}`,
            name: `${newBudget.name}`,
            userId: `${uuidv1()}`,
            limit: {
              value: `${newBudget.limit}`,
              currency: 1,
            },
            period: {
              startDate: "2023-04-20T19:14:20.152Z",
              endDate: "2023-04-25T20:14:20.152Z",
            },
            description: `${newBudget.description}`,
            iconName: `${newBudget.icon}`,
          }),
        }),
      {
        onSuccess: () => {},
      }
    );

  const { mutate: sendBudget } = useSendBudget();

  return (
    <Modal header={t(dict.title)} onClose={() => onClose && onClose()}>
      <SeparatorStyledTop />

      <TabsStyled defaultValue={defaultValue}>
        <Tabs.List>
          <TabsTriggerStyled value="settings">
            {t(dict.tabs.settings)}
          </TabsTriggerStyled>
          <TabsTriggerStyled value="share">
            {t(dict.tabs.share)}
          </TabsTriggerStyled>
        </Tabs.List>
        <Form
          onSubmit={() => {
            console.log(newBudget);
            sendBudget();
          }}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled>
                <Tabs.Content value="settings">
                  <ParagraphStyled>
                    {t(dict.paragraphs.details)}
                  </ParagraphStyled>
                  <IconPickerStyled>
                    <IconPicker
                      defaultIcon={selectedIcon}
                      icons={icons}
                      onSelect={(icon) => {
                        setNewBudget({ ...newBudget, icon });
                        setSelectedIcon(icon);
                      }}
                    />
                  </IconPickerStyled>
                  <InputWrapperFullStyled>
                    <Field
                      name="budget-name"
                      initialValue={newBudget.name}
                      onSubmitValidate={checkNameOnSubmit}
                      onChangeValidate={checkNameOnChange}>
                      {({ value, setValue, errors }) => {
                        return (
                          <Input
                            name="budget-name"
                            value={value}
                            hasError={errors.length > 0}
                            supportingLabel={errors.length ? errors : null}
                            onChange={(e) => {
                              setNewBudget({
                                ...newBudget,
                                name: e.currentTarget.value,
                              });
                              setValue(e.currentTarget.value);
                            }}
                            onInputCleared={() => setValue("")}
                            label={t(dict.inputNames.budgetName)}>
                            {newBudget.name}
                          </Input>
                        );
                      }}
                    </Field>
                  </InputWrapperFullStyled>
                  <InputWrapperHalfStyled>
                    <Field
                      name="budget-limit"
                      initialValue={newBudget.limit}
                      onChangeValidate={checkLimit}
                      onSubmitValidate={checkLimit}>
                      {({ value, setValue, errors }) => (
                        <Input
                          value={value}
                          hasError={errors.length > 0}
                          onChange={(e) => {
                            const roundedValue =
                              Math.round(
                                parseFloat(e.currentTarget.value) * 100
                              ) / 100;
                            if (e.currentTarget.value) {
                              setNewBudget({
                                ...newBudget,
                                limit: roundedValue,
                              });
                              setValue(roundedValue);
                            } else setValue("");
                          }}
                          supportingLabel={errors.length ? errors : null}
                          label={t(dict.inputNames.budgetLimit)}
                          name="budget-limit"
                          type="number"
                          onInputCleared={() => setValue("")}
                        />
                      )}
                    </Field>
                  </InputWrapperHalfStyled>
                  <InputWrapperHalfStyledCurrency>
                    <Field
                      name="currency"
                      initialValue={newBudget.currency.tag}
                      onSubmitValidate={checkCurrency}
                      onChangeValidate={checkCurrency}>
                      {({ value, setValue, errors }) => (
                        // WIP
                        <CurrencySelect
                          value={value}
                          id="currency"
                          label="Currency"
                          supportingLabel={errors[0]}
                          onValueChange={(e) => {
                            setValue(e);
                            setNewBudget({
                              ...newBudget,
                              currency: { ...newBudget.currency, tag: e },
                            });
                          }}
                        />
                      )}
                    </Field>
                  </InputWrapperHalfStyledCurrency>
                  <Field
                    name="description"
                    initialValue={newBudget.description}
                    onSubmitValidate={checkDescription}
                    onChangeValidate={checkDescription}>
                    {({ value, setValue, errors }) => {
                      return (
                        <TextAreaWrapperStyled>
                          <TextareaStyled
                            id="description"
                            name="description"
                            placeholder={newBudget.description}
                            label={t(dict.inputNames.description)}
                            value={value}
                            hasError={errors.length > 0}
                            onChange={(e) => {
                              setNewBudget({
                                ...newBudget,
                                description: e.currentTarget.value,
                              });
                              setValue(e.currentTarget.value);
                            }}
                          />
                          <TextareaErrorStyled>{errors[0]}</TextareaErrorStyled>
                        </TextAreaWrapperStyled>
                      );
                    }}
                  </Field>
                  <ParagraphStyled>
                    {t(dict.paragraphs.budgetPeriod)}
                  </ParagraphStyled>
                  <InputWrapperFullFlex>
                    <Field
                      name="date-start"
                      initialValue={
                        newBudget.dateStart
                          ? new Date(newBudget.dateStart)
                          : null
                      }
                      onSubmitValidate={checkDate}
                      onChangeValidate={checkDate}>
                      {({ setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.dateStart)}
                            selected={
                              newBudget.dateStart
                                ? new Date(newBudget.dateStart)
                                : null
                            }
                            onSelect={(date) => {
                              setValue(date);
                              onSelectStartDate(date);
                            }}
                          />
                          <DatePickerErrorStyled>
                            {errors[0]}
                          </DatePickerErrorStyled>
                        </DatePickerWrapperStyled>
                      )}
                    </Field>
                    <div style={{ alignSelf: "flex-start", marginTop: "18px" }}>
                      {t(dict.paragraphs.wordIt)}
                    </div>
                    <Field
                      name="date-end"
                      listenTo={["date-start"]}
                      initialValue={
                        newBudget.dateEnd ? new Date(newBudget.dateEnd) : null
                      }
                      onSubmitValidate={checkDate}
                      onChangeValidate={(val, form) => {
                        const start = val! && val.getTime();
                        const end =
                          form.getFieldValue("date-start")!.value &&
                          form.getFieldValue("date-start")!.value.getTime();

                        if (start && end) {
                          if (start < end)
                            return Promise.reject(
                              t(dict.errors.dateBeforeStart)
                            );
                        }
                        return Promise.resolve(true);
                      }}>
                      {({ setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.dateEnd)}
                            selected={
                              newBudget.dateEnd
                                ? new Date(newBudget.dateEnd)
                                : null
                            }
                            onSelect={(date) => {
                              setValue(date);
                              onSelectEndDate(date);
                            }}
                          />
                          <DatePickerErrorStyled>
                            {errors[0]}
                          </DatePickerErrorStyled>
                        </DatePickerWrapperStyled>
                      )}
                    </Field>
                  </InputWrapperFullFlex>
                </Tabs.Content>
                <Tabs.Content value="share">Welcome to share</Tabs.Content>
              </ContentStyled>
              <div>
                <SeparatorStyled />
                <ButtonWrapperStyled>
                  <Button onClick={submit}>{t(dict.button)}</Button>
                </ButtonWrapperStyled>
              </div>
            </form>
          )}
        </Form>
      </TabsStyled>
    </Modal>
  );
};

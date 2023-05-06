"use client";

import { useContext, useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
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

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
                            <TextareaErrorStyled>
                              {errors[0]}
                            </TextareaErrorStyled>
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
                      <div
                        style={{ alignSelf: "flex-start", marginTop: "18px" }}>
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
    </QueryClientProvider>
  );
};

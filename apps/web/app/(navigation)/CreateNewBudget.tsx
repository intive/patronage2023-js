"use client";

import { useState } from "react";
import { Button, CustomDatePicker, IconPicker, Input, Modal } from "ui";
import { IconType } from "ui/Icon";
import {
  TabsContentStyled,
  TabsListStyled,
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
} from "./CreateNewBudget.styled";
import { Form, Field } from "houseform";
import { isValid, z } from "zod";
import { useTranslate } from "lib/hooks";

type NewBudget = {
  onClose?: Function;
};

type budgetObjectType = {
  budgetName: string;
  budgetLimit: number | string;
  budgetDescription: string;
  budgetIcon: string;
  budgetDateStart: number | null;
  budgetDateEnd: number | null;
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
const loggedUserExistingBudgets = ["smutnarzaba", "frytki123"];

export const CreateNewBudget = ({ onClose }: NewBudget) => {
  const { t, dict } = useTranslate("AddNewBudgetModal");
  const [defaultValue, setDefaultValue] = useState("settings");
  const [selectedIcon, setSelectedIcon] = useState<IconType>("savings");

  const [budgetObject, setBudgetObject] = useState<budgetObjectType>({
    budgetName: "",
    budgetLimit: "",
    budgetDescription: "",
    budgetIcon: "",
    budgetDateStart: null,
    budgetDateEnd: null,
  });

  const onSelectStartDate = (date: Date) => {
    date
      ? setBudgetObject({ ...budgetObject, budgetDateStart: date.getTime() })
      : setBudgetObject({ ...budgetObject, budgetDateStart: null });
  };

  const onSelectEndDate = (date: Date) => {
    date
      ? setBudgetObject({ ...budgetObject, budgetDateEnd: date.getTime() })
      : setBudgetObject({ ...budgetObject, budgetDateEnd: null });
  };

  return (
    <Modal header={t(dict.title)} onClose={() => onClose && onClose()}>
      <SeparatorStyledTop />
      <Form
        onSubmit={(values) => {
          console.log(values);
          console.log(budgetObject);
        }}>
        {({ submit }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <TabsStyled defaultValue={defaultValue}>
              <TabsListStyled>
                <TabsTriggerStyled value="settings">
                  {t(dict.tabs.settings)}
                </TabsTriggerStyled>
                <TabsTriggerStyled value="share">
                  {t(dict.tabs.share)}
                </TabsTriggerStyled>
              </TabsListStyled>
              <TabsContentStyled value="settings">
                <ParagraphStyled>{t(dict.paragraphs.details)}</ParagraphStyled>
                <IconPickerStyled>
                  <IconPicker
                    defaultIcon={selectedIcon}
                    icons={icons}
                    onSelect={(icon) => {
                      setBudgetObject({ ...budgetObject, budgetIcon: icon });
                      setSelectedIcon(icon);
                    }}
                  />
                </IconPickerStyled>
                <InputWrapperFullStyled>
                  <Field
                    name="budget-name"
                    initialValue={budgetObject.budgetName}
                    onSubmitValidate={z
                      .string()
                      .min(3, "Budget name must have at least 3 characters.")
                      .max(30, "Budget must not have more than 30 characters.")
                      .refine(
                        (val) => !loggedUserExistingBudgets.includes(val),
                        "Name is taken, please choose another."
                      )}
                    onChangeValidate={z
                      .string()
                      .max(30, "Budget must not have more than 30 characters.")
                      .refine(
                        (val) => !loggedUserExistingBudgets.includes(val),
                        "Name is taken, please choose another."
                      )}>
                    {({ value, setValue, errors }) => {
                      return (
                        <Input
                          name="budget-name"
                          value={value}
                          hasError={errors.length > 0}
                          supportingLabel={errors.length ? errors : null}
                          onChange={(e) => {
                            setBudgetObject({
                              ...budgetObject,
                              budgetName: e.currentTarget.value,
                            });
                            setValue(e.currentTarget.value);
                          }}
                          onInputCleared={() => setValue("")}
                          label={t(dict.inputNames.budgetName)}>
                          {budgetObject.budgetName}
                        </Input>
                      );
                    }}
                  </Field>
                </InputWrapperFullStyled>
                <InputWrapperHalfStyled>
                  <Field
                    name="budget-limit"
                    initialValue={budgetObject.budgetLimit}
                    onChangeValidate={z.union([
                      z
                        .string()
                        .nonempty({ message: "Please specify budget limit." }),
                      z
                        .number()
                        .positive({ message: "Must be grater than 0." }),
                    ])}
                    onSubmitValidate={z.union([
                      z
                        .string()
                        .nonempty({ message: "Please specify budget limit." }),
                      z.number().positive({
                        message: "Must be grater than 0.",
                      }),
                    ])}>
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
                            setBudgetObject({
                              ...budgetObject,
                              budgetLimit: roundedValue,
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
                <InputWrapperHalfStyled>
                  <Input label={t(dict.inputNames.currency)} name="currency" />
                </InputWrapperHalfStyled>
                <Field
                  name="description"
                  initialValue={budgetObject.budgetDescription}
                  onSubmitValidate={z
                    .string()
                    .max(50, "Character limit reached.")}
                  onChangeValidate={z
                    .string()
                    .max(50, "Character limit reached.")}>
                  {({ value, setValue, errors }) => {
                    return (
                      <TextAreaWrapperStyled>
                        <TextareaStyled
                          placeholder={budgetObject.budgetDescription}
                          label={t(dict.inputNames.description)}
                          value={value}
                          hasError={errors.length > 0}
                          onChange={(e) => {
                            setBudgetObject({
                              ...budgetObject,
                              budgetDescription: e.currentTarget.value,
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
                    onSubmitValidate={z.union([
                      z.date(),
                      z
                        .string()
                        .nonempty({ message: "Please specify starting date" }),
                    ])}
                    onChangeValidate={z.union([
                      z.date(),
                      z
                        .string()
                        .nonempty({ message: "Please specify starting date" }),
                    ])}>
                    {({ setValue, errors }) => (
                      <DatePickerWrapperStyled>
                        <CustomDatePicker
                          selected={
                            budgetObject.budgetDateStart
                              ? new Date(budgetObject.budgetDateStart)
                              : null
                          }
                          placeholder={t(dict.inputNames.dateStart)}
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
                  to
                  <Field
                    name="date-end"
                    onSubmitValidate={z.union([
                      z.date(),
                      z
                        .string()
                        .nonempty({ message: "Please specify ending date" }),
                    ])}
                    onChangeValidate={z.union([
                      z.date(),
                      z
                        .string()
                        .nonempty({ message: "Please specify ending date" }),
                    ])}>
                    {({ setValue, errors }) => (
                      <DatePickerWrapperStyled>
                        <CustomDatePicker
                          selected={
                            budgetObject.budgetDateEnd
                              ? new Date(budgetObject.budgetDateEnd)
                              : null
                          }
                          placeholder={t(dict.inputNames.dateEnd)}
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
              </TabsContentStyled>
              <TabsContentStyled value="share">
                Welcome to share
              </TabsContentStyled>
              <SeparatorStyled />
              <ButtonWrapperStyled>
                <Button onClick={submit}>{t(dict.button)}</Button>
              </ButtonWrapperStyled>
            </TabsStyled>
          </form>
        )}
      </Form>
    </Modal>
  );
};
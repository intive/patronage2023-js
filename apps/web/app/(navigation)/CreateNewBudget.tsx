"use client";

import { useState } from "react";
import { Button, CustomDatePicker, IconPicker, Input, Modal } from "ui";
import { IconType } from "ui/Icon";
import {
  TabsContentStyled,
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
  FooterStyled,
  ContentStyled,
} from "./CreateNewBudget.styled";
import { Form, Field } from "houseform";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "./useValidateBudgetModal";
import * as Tabs from "@radix-ui/react-tabs";

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
export const loggedUserExistingBudgets = ["smutnarzaba", "frytki123"];

export const CreateNewBudget = ({ onClose }: NewBudget) => {
  const { t, dict } = useTranslate("AddNewBudgetModal");
  const [defaultValue, setDefaultValue] = useState("settings");
  const [selectedIcon, setSelectedIcon] = useState<IconType>("savings");

  const {
    checkBudgetNameOnChange,
    checkBudgetNameOnSubmit,
    checkBudgetLimit,
    checkDescription,
    checkStartDate,
    checkEndDate,
  } = useValidateBudgetModal("AddNewBudgetModal");

  const [budgetObject, setBudgetObject] = useState<budgetObjectType>({
    budgetName: "",
    budgetLimit: "",
    budgetDescription: "",
    budgetIcon: selectedIcon,
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
            console.log(budgetObject);
          }}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled>
                <TabsContentStyled value="settings">
                  <ParagraphStyled>
                    {t(dict.paragraphs.details)}
                  </ParagraphStyled>
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
                      onSubmitValidate={checkBudgetNameOnSubmit}
                      onChangeValidate={checkBudgetNameOnChange}>
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
                      onChangeValidate={checkBudgetLimit}
                      onSubmitValidate={checkBudgetLimit}>
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
                    <Input
                      label={t(dict.inputNames.currency)}
                      name="currency"
                    />
                  </InputWrapperHalfStyled>
                  <Field
                    name="description"
                    initialValue={budgetObject.budgetDescription}
                    onSubmitValidate={checkDescription}
                    onChangeValidate={checkDescription}>
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
                      initialValue={
                        budgetObject.budgetDateStart
                          ? new Date(budgetObject.budgetDateStart)
                          : null
                      }
                      onSubmitValidate={checkStartDate}
                      onChangeValidate={checkStartDate}>
                      {({ setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.dateStart)}
                            selected={
                              budgetObject.budgetDateStart
                                ? new Date(budgetObject.budgetDateStart)
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
                        budgetObject.budgetDateEnd
                          ? new Date(budgetObject.budgetDateEnd)
                          : null
                      }
                      onSubmitValidate={checkEndDate}
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
                              budgetObject.budgetDateEnd
                                ? new Date(budgetObject.budgetDateEnd)
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
                </TabsContentStyled>
                <TabsContentStyled value="share">
                  Welcome to share
                </TabsContentStyled>
              </ContentStyled>
              <FooterStyled>
                <SeparatorStyled />
                <ButtonWrapperStyled>
                  <Button onClick={submit}>{t(dict.button)}</Button>
                </ButtonWrapperStyled>
              </FooterStyled>
            </form>
          )}
        </Form>
      </TabsStyled>
    </Modal>
  );
};

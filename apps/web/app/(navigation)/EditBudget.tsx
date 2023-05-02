"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Form, Field } from "houseform";
import { useState } from "react";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "./useValidateBudgetModal";
import { Budget } from "lib/types";
import { Modal, IconPicker, Input, CustomDatePicker, Button } from "ui";
import {
  SeparatorStyledTop,
  TabsStyled,
  TabsTriggerStyled,
  ContentStyled,
  ParagraphStyled,
  IconPickerStyled,
  InputWrapperFullStyled,
  TextAreaWrapperStyled,
  TextareaStyled,
  TextareaErrorStyled,
  InputWrapperFullFlex,
  DatePickerErrorStyled,
  DatePickerWrapperStyled,
  SeparatorStyled,
  ButtonWrapperStyled,
} from "./CreateNewBudget.styled";

import { icons } from "./CreateNewBudget";

import { IconType } from "ui/Icon";

interface Currency {
  tag: string;
  locale: string;
}

interface EditBudgetProps {
  budget: Budget;
  handleHideEditBudgetModal: () => void;
  onClose: () => void;
  handleBudgetsEdit: (budgetsAfterEdit: Budget[]) => void;
}

export const EditBudget = ({
  budget,
  onClose,
  handleHideEditBudgetModal,
  handleBudgetsEdit,
}: EditBudgetProps) => {
  const [editBudget, setEditBudget] = useState(budget);
  const [selectedIcon, setSelectedIcon] = useState(budget.icon);
  const [defaultValueTabs, setDefaultValueTabs] = useState("settings");
  const { t, dict } = useTranslate("EditBudgetModal");

  const { checkNameOnChange, checkNameOnSubmit, checkDescription, checkDate } =
    useValidateBudgetModal("AddNewBudgetModal");

  return (
    <Modal header={t(dict.title)} onClose={handleHideEditBudgetModal}>
      <SeparatorStyledTop />
      <TabsStyled defaultValue={defaultValueTabs}>
        <Tabs.List>
          <TabsTriggerStyled value="settings">
            {t(dict.tabs.settings)}
          </TabsTriggerStyled>
          <TabsTriggerStyled value="share">
            {t(dict.tabs.share)}
          </TabsTriggerStyled>
        </Tabs.List>
        <Form
          onSubmit={async () => {
            const budgetsResponse = await fetch("/budgets.json");
            const { budgets } = await budgetsResponse.json();

            const budgetsAfterEdit = budgets.map((budget: Budget) => {
              if (budget.id !== editBudget.id) return budget;

              return editBudget;
            });

            handleBudgetsEdit(budgetsAfterEdit);
          }}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
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
                        setEditBudget({ ...editBudget, icon });
                        setSelectedIcon(icon);
                      }}
                    />
                  </IconPickerStyled>
                  <InputWrapperFullStyled>
                    <Field
                      name="budget-name"
                      initialValue={editBudget.name}
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
                              setEditBudget({
                                ...editBudget,
                                name: e.currentTarget.value,
                              });
                              setValue(e.currentTarget.value);
                            }}
                            onInputCleared={() => setValue("")}
                            label={t(dict.inputNames.budgetName)}>
                            {editBudget.name}
                          </Input>
                        );
                      }}
                    </Field>
                  </InputWrapperFullStyled>
                  <Field
                    name="description"
                    initialValue={editBudget.description}
                    onSubmitValidate={checkDescription}
                    onChangeValidate={checkDescription}>
                    {({ value, setValue, errors }) => {
                      return (
                        <TextAreaWrapperStyled>
                          <TextareaStyled
                            id="description"
                            name="description"
                            placeholder={editBudget.description}
                            label={t(dict.inputNames.description)}
                            value={value}
                            hasError={errors.length > 0}
                            onChange={(e) => {
                              setEditBudget({
                                ...editBudget,
                                description: e.currentTarget.value,
                              });
                              setValue(e.currentTarget.value);
                            }}
                          />
                          <TextareaErrorStyled>
                            {errors.at(0)}
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
                      name="start-date"
                      initialValue={
                        editBudget.startDate
                          ? new Date(editBudget.startDate)
                          : null
                      }
                      onSubmitValidate={checkDate}
                      onChangeValidate={checkDate}>
                      {({ setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.startDate)}
                            selected={
                              editBudget.startDate
                                ? new Date(editBudget.startDate)
                                : null
                            }
                            onSelect={(date) => {
                              setValue(date);
                              setEditBudget({
                                ...editBudget,
                                startDate: date!.getTime(),
                              });
                            }}
                          />
                          <DatePickerErrorStyled>
                            {errors.at(0)}
                          </DatePickerErrorStyled>
                        </DatePickerWrapperStyled>
                      )}
                    </Field>
                    <div style={{ alignSelf: "flex-start", marginTop: "18px" }}>
                      {t(dict.paragraphs.wordIt)}
                    </div>
                    <Field
                      name="end-date"
                      listenTo={["start-date"]}
                      initialValue={
                        editBudget.endDate ? new Date(editBudget.endDate) : null
                      }
                      onSubmitValidate={checkDate}
                      onChangeValidate={(val, form) => {
                        const start = val! && val.getTime();
                        const end =
                          form.getFieldValue("start-date")!.value &&
                          form.getFieldValue("start-date")!.value.getTime();

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
                            label={t(dict.inputNames.endDate)}
                            selected={
                              editBudget.endDate
                                ? new Date(editBudget.endDate)
                                : null
                            }
                            onSelect={(date) => {
                              setValue(date);
                              setEditBudget({
                                ...editBudget,
                                endDate: date!.getTime(),
                              });
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

"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Form, Field, FormInstance } from "houseform";
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
  const { t, dict } = useTranslate("EditBudgetModal");

  const { checkNameOnChange, checkNameOnSubmit, checkDescription, checkDate } =
    useValidateBudgetModal("AddNewBudgetModal");

  const defaultValueTabs = "settings";

  const getDateObject = (dateType: string) => {
    if (dateType === "start-date") {
      return budget.startDate ? new Date(budget.startDate) : null;
    } else if (dateType === "end-date")
      return budget.endDate ? new Date(budget.endDate) : null;
  };

  const getSelectedValue = (value: Date | null) =>
    value ? new Date(value) : null;

  const checkEndDateOnChangeValidate = (
    endDateValue: Date | null,
    form: FormInstance<any>
  ) => {
    const endTimestamp = endDateValue?.getTime();
    const startTimestamp = form.getFieldValue("start-date")!.value?.getTime();

    if (endTimestamp && startTimestamp) {
      if (startTimestamp > endTimestamp) return Promise.reject(t(dict.errors.dateBeforeStart));
    }
    return Promise.resolve(true);
  };

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
          onSubmit={async (values) => {
            const newBudgetFromValues: Budget = {
              ...budget,
              name: values["budget-name"],
              description: values["description"],
              icon: values["icon"],
              startDate: values["start-date"].getTime(),
              endDate: values["end-date"].getTime(),
            };
            const budgetsResponse = await fetch("/budgets.json");
            const { budgets } = await budgetsResponse.json();

            const budgetsAfterEdit = budgets.map((budgetJSON: Budget) =>
              budgetJSON.id === budget.id ? newBudgetFromValues : budgetJSON
            );

            handleBudgetsEdit(budgetsAfterEdit);
            console.log(newBudgetFromValues);
            onClose();
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
                    <Field name="icon" initialValue={budget.icon}>
                      {({ value, setValue }) => (
                        <IconPicker
                          defaultIcon={value}
                          icons={icons}
                          onSelect={(icon) => setValue(icon)}
                        />
                      )}
                    </Field>
                  </IconPickerStyled>
                  <InputWrapperFullStyled>
                    <Field
                      name="budget-name"
                      initialValue={budget.name}
                      onSubmitValidate={checkNameOnSubmit}
                      onChangeValidate={checkNameOnChange}>
                      {({ value, setValue, errors }) => (
                        <Input
                          name="budget-name"
                          value={value}
                          hasError={errors.length > 0}
                          supportingLabel={errors.length ? errors : null}
                          onChange={(e) => {
                            setValue(e.currentTarget.value);
                          }}
                          onInputCleared={() => setValue("")}
                          label={t(dict.inputNames.budgetName)}>
                          {budget.name}
                        </Input>
                      )}
                    </Field>
                  </InputWrapperFullStyled>
                  <Field
                    name="description"
                    initialValue={budget.description}
                    onSubmitValidate={checkDescription}
                    onChangeValidate={checkDescription}>
                    {({ value, setValue, errors }) => {
                      return (
                        <TextAreaWrapperStyled>
                          <TextareaStyled
                            id="description"
                            name="description"
                            placeholder={budget.description}
                            label={t(dict.inputNames.description)}
                            value={value}
                            hasError={errors.length > 0}
                            onChange={(e) => {
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
                      initialValue={getDateObject("start-date")}
                      onSubmitValidate={checkDate}
                      onChangeValidate={checkDate}>
                      {({ value, setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.startDate)}
                            selected={getSelectedValue(value)}
                            onSelect={(date) => {
                              setValue(date);
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
                      initialValue={getDateObject("end-date")}
                      onSubmitValidate={checkDate}
                      onChangeValidate={(val, form) =>
                        checkEndDateOnChangeValidate(val, form)
                      }>
                      {({ value, setValue, errors }) => (
                        <DatePickerWrapperStyled>
                          <CustomDatePicker
                            hasError={errors.length > 0}
                            label={t(dict.inputNames.endDate)}
                            selected={getSelectedValue(value)}
                            onSelect={(date) => {
                              setValue(date);
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

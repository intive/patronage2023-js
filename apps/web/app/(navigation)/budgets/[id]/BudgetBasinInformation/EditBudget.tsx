"use client";

import { Form, Field, FormInstance } from "houseform";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "lib/validations/useValidateBudgetModal";
import { BudgetFixed } from "lib/types";
import { Modal, IconPicker, Input, CustomDatePicker, Button } from "ui";
import {
  SeparatorStyledTop,
  FormWrapperStyled,
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
  ErrorMessageWrapper,
} from "../BudgetContent/CreateNewBudget.styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { icons } from "../BudgetContent/CreateNewBudget";
import { useState } from "react";
import { ErrorMessage } from "ui";
import useSuperfetch from "lib/hooks/useSuperfetch";

interface EditBudgetProps {
  budget: BudgetFixed;
  onClose: () => void;
}

interface EditedBudgetBEProps {
  name: string;
  description: string;
  iconName: string;
  period: {
    startDate: string;
    endDate: string;
  };
}

export const EditBudget = ({ budget, onClose }: EditBudgetProps) => {
  const { t, dict } = useTranslate("EditBudgetModal");
  const fetch = useSuperfetch();
  const [errMsg, setErrMsg] = useState("");
  const { checkNameOnChange, checkNameOnSubmit, checkDescription, checkDate } =
    useValidateBudgetModal("EditBudgetModal");

  const queryClient = useQueryClient();

  const sendEditedBudgetMutation = useMutation({
    mutationFn: (edited: EditedBudgetBEProps) => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}/budgets/${budget.id}/edit`, {
        method: "PUT",
        body: edited,
      });
    },
    onError: () => {
      setErrMsg(t(dict.errors.errorDefault));
      return;
    },
    onSettled: (data) => {
      switch (data!.httpStatus) {
        case 201:
          queryClient.invalidateQueries({ queryKey: ["budgets"] });
          onClose();
          break;
        case 400:
          setErrMsg(t(dict.errors.error400));
          break;
        case 401:
          setErrMsg(t(dict.errors.error401));
          break;
        default:
          setErrMsg(t(dict.errors.errorDefault));
          return;
      }
    },
  });

  const getDateObject = (dateType: string) => {
    if (dateType === "start-date") {
      return budget.startDate ? new Date(budget.startDate) : null;
    } else if (dateType === "end-date")
      return budget.endDate ? new Date(budget.endDate) : null;
  };

  const checkEndDateOnChangeValidate = (
    endDateValue: Date | null,
    form: FormInstance<any>
  ) => {
    const startDateValue = form.getFieldValue("start-date")!.value;

    if (startDateValue && endDateValue) {
      if (startDateValue > endDateValue)
        return Promise.reject(t(dict.errors.dateBeforeStart));
    }
    return Promise.resolve(true);
  };

  const handleSubmit = (values: Record<string, any>) => {
    const editedBudget: EditedBudgetBEProps = {
      name: values["budget-name"],
      description: values.description,
      iconName: values.icon,
      period: {
        startDate: values["start-date"].toISOString(),
        endDate: values["end-date"].toISOString(),
      },
    };
    console.log(JSON.stringify(editedBudget));
    sendEditedBudgetMutation.mutate(editedBudget);
  };

  return (
    <Modal header={t(dict.title)} onClose={onClose} fullHeight>
      {errMsg.length > 0 && (
        <ErrorMessageWrapper>
          <ErrorMessage message={errMsg} onClose={() => setErrMsg("")} />
        </ErrorMessageWrapper>
      )}
      <SeparatorStyledTop />
      <FormWrapperStyled>
        <Form onSubmit={(values) => handleSubmit(values)}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled>
                <ParagraphStyled>{t(dict.paragraphs.details)}</ParagraphStyled>
                <IconPickerStyled>
                  <Field name="icon" initialValue={budget.icon}>
                    {({ value, setValue }) => (
                      <IconPicker
                        defaultIcon={value}
                        icons={icons}
                        onSelect={(icon) => {
                          setValue(icon);
                        }}
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
                          selected={value}
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
                          selected={value}
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
      </FormWrapperStyled>
    </Modal>
  );
};

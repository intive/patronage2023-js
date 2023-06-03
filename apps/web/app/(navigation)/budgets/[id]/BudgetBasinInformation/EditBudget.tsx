"use client";

import { Form, Field, FormInstance } from "houseform";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "lib/validations/useValidateBudgetModal";
import { BudgetFixed } from "lib/types";
import {
  Modal,
  IconPicker,
  Input,
  CustomDatePicker,
  Button,
  IconType,
} from "ui";
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
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { icons } from "../BudgetContent/CreateNewBudget";
import { useEffect, useState } from "react";
import { ErrorMessage } from "ui";
import { ShareBudget } from "../ShareBudgetOld";
import useSuperfetch from "lib/hooks/useSuperfetch";
import { ContentWrapper } from "../ShareBudgetOld/ShareBudget.styled";

interface EditBudgetProps {
  budget: BudgetFixed;
  onClose: () => void;
}

interface EditedBudgetProps {
  name: string;
  description: string;
  iconName: string;
  startDate: string;
  endDate: string;
}

export const EditBudget = ({ budget, onClose }: EditBudgetProps) => {
  const { t, dict } = useTranslate("EditBudgetModal");
  const fetch = useSuperfetch();
  const [errMsg, setErrMsg] = useState("");
  const { checkNameOnChange, checkNameOnSubmit, checkDescription, checkDate } =
    useValidateBudgetModal("EditBudgetModal");

  const initialBudget = {
    name: budget.name,
    description: budget.description,
    iconName: budget.icon,
    startDate: budget.startDate,
    endDate: budget.endDate,
  };

  const [editedBudget, setEditedBudget] =
    useState<EditedBudgetProps>(initialBudget);

  const queryClient = useQueryClient();

  const sendEditedBudgetMutation = useMutation({
    mutationFn: (edited: EditedBudgetProps) => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}/budgets/${budget.id}/edit`, {
        method: "PUT",
        body: {
          name: edited.name,
          description: edited.description,
          iconName: edited.iconName,
          period: {
            startDate: edited.startDate,
            endDate: edited.endDate,
          },
        },
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
      return editedBudget.startDate ? new Date(editedBudget.startDate) : null;
    } else if (dateType === "end-date")
      return editedBudget.endDate ? new Date(editedBudget.endDate) : null;
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

  const handleSubmit = () => {
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
        <Form onSubmit={() => handleSubmit()}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled>
                <ParagraphStyled>{t(dict.paragraphs.details)}</ParagraphStyled>
                <IconPickerStyled>
                  <Field
                    name="icon"
                    initialValue={editedBudget.iconName as IconType}>
                    {({ value, setValue }) => (
                      <IconPicker
                        defaultIcon={value}
                        icons={icons}
                        onSelect={(icon) => {
                          setValue(icon);
                          setEditedBudget({
                            ...editedBudget,
                            iconName: icon,
                          });
                        }}
                      />
                    )}
                  </Field>
                </IconPickerStyled>
                <InputWrapperFullStyled>
                  <Field
                    name="budget-name"
                    initialValue={editedBudget.name}
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
                          setEditedBudget({
                            ...editedBudget,
                            name: e.currentTarget.value,
                          });
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
                  initialValue={editedBudget.description}
                  onSubmitValidate={checkDescription}
                  onChangeValidate={checkDescription}>
                  {({ value, setValue, errors }) => {
                    return (
                      <TextAreaWrapperStyled>
                        <TextareaStyled
                          id="description"
                          name="description"
                          placeholder={editedBudget.description}
                          label={t(dict.inputNames.description)}
                          value={value}
                          hasError={errors.length > 0}
                          onChange={(e) => {
                            setValue(e.currentTarget.value);
                            setEditedBudget({
                              ...editedBudget,
                              description: e.currentTarget.value,
                            });
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
                            setEditedBudget({
                              ...editedBudget,
                              startDate: date ? date.toISOString() : "",
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
                            setEditedBudget({
                              ...editedBudget,
                              endDate: date ? date.toISOString() : "",
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

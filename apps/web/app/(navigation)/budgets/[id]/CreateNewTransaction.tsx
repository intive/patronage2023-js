"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { Field, Form } from "houseform";
import { z } from "zod";
import { useTranslate } from "lib/hooks";
import { useCategoryMap } from "lib/hooks";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { Budget } from "lib/types";
import {
  Button,
  CustomDatePicker,
  Input,
  Modal,
  ErrorMessage,
  Select,
  CategoryIcon,
} from "ui";
import {
  ButtonWrapperStyled,
  ContentStyled,
  DatePickerErrorStyled,
  DatePickerWrapperStyled,
  ErrorWrapper,
  FormWrapper,
  ParagraphStyled,
  SeparatorStyled,
} from "./CreateNewTransactionStyled";

type CreateNewTransactionProps = {
  type: string;
  onClose: () => void;
  budget: Budget;
};

type TransactionType = {
  type: string;
  id: string;
  name: string;
  value: number | string;
  category: string;
  transactionDate: string | null;
};

type createTransactionBEProps = {
  status: number;
};

export const CreateNewTransaction = ({
  type,
  budget,
  onClose,
}: CreateNewTransactionProps) => {
  const { t, dict } = useTranslate("CreateNewTransactionModal");
  const { data } = useSession();
  const { hasScrollbar } = useHasScrollBar();
  const categoryMap = useCategoryMap();
  const [errorMsg, setErrorMsg] = useState("");
  console.log(errorMsg);

  const handleCloseErrorMsg = () => setErrorMsg("");

  const url = `${env.NEXT_PUBLIC_API_URL}/budgets/${budget.id}/transaction`;
  const token = data?.user.accessToken;

  const queryClient = useQueryClient();

  const newTransactionMutation = useMutation(
    (newTransaction: TransactionType) => {
      const result = fetch(url, {
        method: "POST",
        headers: {
          accept: "text/plain",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });
      console.log(result.then((Response) => Response.json()));
      return result;
    },
    {
      onSuccess: (data: createTransactionBEProps) => {
        switch (data.status) {
          case 201:
            queryClient.invalidateQueries(["datatable"]);
            queryClient.invalidateQueries(["mainStatistics"]);
            queryClient.invalidateQueries(["rangedStatistics"]);
            onClose();
            break;
          case 400:
            setErrorMsg(t(dict.responseErrors[400]));
            break;
          case 401:
            setErrorMsg(t(dict.responseErrors[401]));
            break;
          default:
            setErrorMsg(t(dict.responseErrors.default));
            return;
        }
      },
      onError: (error) => console.error(error),
    }
  );

  const convertAmount = (amount: number) => {
    if (type === "Expense") {
      return -1 * amount;
    } else {
      return amount;
    }
  };

  const convertDate = (date: Date | null) => {
    return date ? date.toISOString() : "";
  };

  const handleSubmit = (values: Record<string, any>) => {
    const newTransaction: TransactionType = {
      id: crypto.randomUUID(),
      type,
      name: values.transactionName,
      value: convertAmount(values.transactionAmount),
      category: values.category,
      transactionDate: convertDate(values.date),
    };
    newTransactionMutation.mutate(newTransaction);
  };

  const name = t(
    type === "Income" ? dict.nameLabel.income : dict.nameLabel.expense
  );
  const header = t(
    type === "Income" ? dict.header.income : dict.header.expense
  );
  const startDate = new Date(budget.startDate);
  const endDate = new Date(budget.endDate);

  const fullHeight = window.innerHeight < 660;

  return (
    <Modal onClose={onClose} header={header} fullHeight={fullHeight}>
      <FormWrapper>
        {errorMsg !== "" && (
          <ErrorWrapper>
            <ErrorMessage message={errorMsg} onClose={handleCloseErrorMsg} />
          </ErrorWrapper>
        )}
        <Form onSubmit={(values) => handleSubmit(values)}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled fullHeight={fullHeight}>
                <ParagraphStyled>{t(dict.details)}</ParagraphStyled>
                <Field
                  name="transactionName"
                  initialValue={""}
                  onSubmitValidate={z
                    .string()
                    .min(3, t(dict.errors.min3characters))
                    .max(58, t(dict.errors.max58characters))}
                  onChangeValidate={z
                    .string()
                    .max(58, t(dict.errors.max58characters))}>
                  {({ value, setValue, errors }) => (
                    <Input
                      name="transactionName"
                      value={value}
                      label={name}
                      hasError={errors.length > 0}
                      supportingLabel={errors.length ? errors : null}
                      onChange={(e) => {
                        setValue(e.currentTarget.value);
                      }}
                      onInputCleared={() => setValue("")}
                    />
                  )}
                </Field>
                <Field
                  name="transactionAmount"
                  onSubmitValidate={z.union([
                    z.string().nonempty({
                      message: t(dict.errors.amountNotEmpty),
                    }),
                    z.number().positive({
                      message: t(dict.errors.amountGraterThanZero),
                    }),
                  ])}
                  onChangeValidate={z.union([
                    z.string().nonempty({
                      message: t(dict.errors.amountNotEmpty),
                    }),
                    z.number().positive({
                      message: t(dict.errors.amountGraterThanZero),
                    }),
                  ])}>
                  {({ value, setValue, errors }) => (
                    <Input
                      name="transactionAmount"
                      type="number"
                      label={t(dict.amountLabel)}
                      value={value}
                      hasError={errors.length > 0}
                      onChange={(e) => {
                        setValue(parseFloat(e.currentTarget.value));
                      }}
                      supportingLabel={errors.length ? errors : null}
                      onInputCleared={() => setValue("")}
                    />
                  )}
                </Field>
                <Field
                  name="category"
                  initialValue={""}
                  onSubmitValidate={z
                    .string()
                    .nonempty({ message: t(dict.errors.selectCategory) })}
                  onChangeValidate={z
                    .string()
                    .nonempty({ message: t(dict.errors.selectCategory) })}>
                  {({ setValue, errors, value }) => (
                    <Select
                      items={Object.entries(categoryMap).map(
                        ([categoryKey, category]) => ({
                          value: categoryKey,
                          label: (
                            <>
                              <CategoryIcon small category={category} />
                              <span>{category.name}</span>
                            </>
                          ),
                        })
                      )}
                      onValueChange={(newValue) => {
                        setValue(newValue);
                      }}
                      hasIcon
                      label={t(dict.categoryLabel)}
                      error={errors[0]}
                      value={value}
                      hasScrollbar={hasScrollbar}
                    />
                  )}
                </Field>
                <Field
                  name="date"
                  onSubmitValidate={z.date().refine(
                    (date) => {
                      return date >= startDate && date <= endDate;
                    },
                    { message: t(dict.errors.dateNotInStartEndRange) }
                  )}
                  onChangeValidate={z.date({
                    invalid_type_error: t(dict.errors.selectDate),
                  })}>
                  {({ value, setValue, errors }) => (
                    <DatePickerWrapperStyled>
                      <CustomDatePicker
                        hasError={errors.length > 0}
                        label={t(dict.dateLabel)}
                        selected={value}
                        onSelect={(date) => {
                          setValue(date);
                        }}
                      />
                      {errors.length > 0 && (
                        <DatePickerErrorStyled>
                          {errors[0]}
                        </DatePickerErrorStyled>
                      )}
                    </DatePickerWrapperStyled>
                  )}
                </Field>
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
      </FormWrapper>
    </Modal>
  );
};

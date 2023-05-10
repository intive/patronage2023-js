"use client";
import { Field, Form } from "houseform";
import { useState } from "react";
import { Button, CustomDatePicker, Input, Modal } from "ui";
import { z } from "zod";
import {
  ButtonWrapperStyled,
  ContentStyled,
  DatePickerErrorStyled,
  DatePickerWrapperStyled,
  FormWrapper,
  ParagraphStyled,
  SeparatorStyled,
} from "./CreateNewTransactionStyled";
import { useTranslate } from "lib/hooks";
import { CategorySelector } from "./CategorySelector";
import { useMutation, useQueryClient } from "react-query";
import { env } from "env.mjs";
import { v4 as uuidv4 } from "uuid";

type CreateNewTransactionProps = {
  type: string;
  onClose: () => void;
  budgetId: string | undefined;
};

type TransactionType = {
  type: string;
  id: string;
  name: string;
  value: number | string;
  category: string;
  transactionDate: string | null;
};

export const CreateNewTransaction = ({
  type,
  // budgetId,
  onClose,
}: CreateNewTransactionProps) => {
  const { t, dict } = useTranslate("CreateNewTransactionModal");

  const budgetId = "7e6ca5f0-5ef8-44bc-a8bc-175c826b39b4";
  const url = `${env.NEXT_PUBLIC_API_URL}/budgets/${budgetId}/transaction`;
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM3MzA1MzQsImlhdCI6MTY4MzcyMzMzNCwianRpIjoiM2I5ZjM5NzItNTRlNS00NDc2LWEwNGMtYTJiNWEzYWM4MmU3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjU5Yzc3MzkxLTZiYTMtNDU1Yy1hNDIzLWZiZDljMzBmOWQwNCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjU5Yzc3MzkxLTZiYTMtNDU1Yy1hNDIzLWZiZDljMzBmOWQwNCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.gRd_uxVHX3kZVLLbrsK1Pie_QnnLWKkYSRjKZMbKqOw1rAjb0oUt6OfN8mU4FMgB71S8kyK5QRbhyRQqt18Xa3bDSDu_T66yj-nCy8GyC_GPy9zI-sjJtt1fMtym9E_Xfj355YQQ9jGXyaCpT8Fiwh1wtrYmjRN3DDBkyKvmTovBkL2_eq89w_nTaDMbOW_xJqdJeSbTic55Iq1US1_zbC8VeEXfR2EHd_yRcSB-dA-hC_ritcqS97DHdlzwo4Ztu5ATgP847y0pSp90NSFAt6KTDNdn5JAOMrm7I4mIw3fd_xAAld_FRYfmZBSZZDUUlRU3ZudJ9eRkyRrb4PJsrw";

  // userid = 59c77391-6ba3-455c-a423-fbd9c30f9d04

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
      console.log(result);
      return result;
    }
    // {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["transactions"]);
    //     onClose();
    //   },
    //   onError: () => console.error(),
    // }
  );

  const convertAmount = (amount: string) => {
    if (type === "Expense") {
      return -1 * parseFloat(amount);
    } else {
      return parseFloat(amount);
    }
  };

  const convertDate = (date: Date | null) => {
    return date ? date.toISOString() : "";
  };

  const handleSubmit = (newTransaction: TransactionType) => {
    console.log(newTransaction);

    // onClose();
  };

  const getHeader = (type: string) => {
    if (type === "Income") {
      return t(dict.header.income);
    } else if (type === "Expense") {
      return t(dict.header.expense);
    } else {
      return "";
    }
  };

  const getNameLabel = (type: string) => {
    if (type === "Income") {
      return t(dict.nameLabel.income);
    } else if (type === "Expense") {
      return t(dict.nameLabel.expense);
    } else {
      return "";
    }
  };

  const fullHeight = window.innerHeight < 660;

  return (
    <Modal onClose={onClose} header={getHeader(type)} fullHeight={fullHeight}>
      <FormWrapper>
        <Form
          onSubmit={(values) => {
            const newTransaction: TransactionType = {
              id: crypto.randomUUID(),
              type,
              name: values["transaction-name"],
              value: convertAmount(values["transaction-amount"]),
              category: values["category"],
              transactionDate: convertDate(values["date"]),
            };
            newTransactionMutation.mutate(newTransaction);

            // handleSubmit(newTransaction);
          }}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled fullHeight={fullHeight}>
                <ParagraphStyled>{t(dict.details)}</ParagraphStyled>
                <Field
                  name="transaction-name"
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
                      name="transaction-name"
                      value={value}
                      label={getNameLabel(type)}
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
                  name="transaction-amount"
                  initialValue={""}
                  onSubmitValidate={z.union([
                    z
                      .string()
                      .nonempty({ message: t(dict.errors.amountNotEmpty) }),
                    z.number().positive({
                      message: t(dict.errors.amountGraterThanZero),
                    }),
                  ])}
                  onChangeValidate={z.union([
                    z
                      .string()
                      .nonempty({ message: t(dict.errors.amountNotEmpty) }),
                    z.number().positive({
                      message: t(dict.errors.amountGraterThanZero),
                    }),
                  ])}>
                  {({ value, setValue, errors }) => (
                    <Input
                      name="transaction-amount"
                      type="number"
                      label={t(dict.amountLabel)}
                      value={value}
                      hasError={errors.length > 0}
                      onChange={(e) => {
                        setValue(e.currentTarget.value);
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
                  {({ setValue, errors }) => (
                    <CategorySelector
                      errors={errors}
                      onValueChange={(newValue) => {
                        setValue(newValue);
                      }}
                      label={t(dict.categoryLabel)}
                    />
                  )}
                </Field>
                <Field
                  name="date"
                  // TODO add validation -> date in budget period
                  onSubmitValidate={z.date({
                    invalid_type_error: t(dict.errors.selectDate),
                  })}
                  onChangeValidate={z.date({
                    invalid_type_error: t(dict.errors.selectDate),
                  })}>
                  {({ value, setValue, errors }) => (
                    <DatePickerWrapperStyled>
                      <CustomDatePicker
                        hasError={errors.length > 0}
                        label={t(dict.dateLabel)}
                        selected={value && value}
                        onSelect={(date) => {
                          setValue(date);
                        }}
                      />
                      <DatePickerErrorStyled>{errors[0]}</DatePickerErrorStyled>
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

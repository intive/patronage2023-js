"use client";
import { Field, Form } from "houseform";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";

type CreateNewTransactionProps = {
  type: string;
  onClose: () => void;
  budget: any;
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
  budget,
  onClose,
}: CreateNewTransactionProps) => {
  const { t, dict } = useTranslate("CreateNewTransactionModal");
  const { data } = useSession();

  const url = `${env.NEXT_PUBLIC_API_URL}/budgets/${budget.id}/transaction`;
  const token = data?.user.accessToken;

  // const queryClient = useQueryClient();

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
      onSuccess: () => {
        // queryClient.invalidateQueries(["datatable"]);
        onClose();
      },
      // onError: (error) => console.error(error),
    }
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

  const handleSubmit = (values: Record<string, any>) => {
    const newTransaction: TransactionType = {
      id: crypto.randomUUID(),
      type,
      name: values["transaction-name"],
      value: convertAmount(values["transaction-amount"]),
      category: values["category"],
      transactionDate: convertDate(values["date"]),
    };
    newTransactionMutation.mutate(newTransaction);
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

  const startDate = new Date(budget.startDate);
  const endDate = new Date(budget.endDate);

  const fullHeight = window.innerHeight < 660;

  return (
    <Modal onClose={onClose} header={getHeader(type)} fullHeight={fullHeight}>
      <FormWrapper>
        <Form onSubmit={(values) => handleSubmit(values)}>
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
"use client";
import { Field, Form } from "houseform";
import { Button, CustomDatePicker, Input, Modal, CategorySelector } from "ui";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import categoryMap from "lib/category-map";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { Budget } from "lib/types";

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

export const CreateNewTransaction = ({
  type,
  budget,
  onClose,
}: CreateNewTransactionProps) => {
  const { t, dict } = useTranslate("CreateNewTransactionModal");
  const { data } = useSession();
  const { hasScrollbar } = useHasScrollBar();

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
      onSuccess: () => {
        queryClient.invalidateQueries(["datatable"]);
        onClose();
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
                  {({ setValue, errors }) => (
                    <CategorySelector
                      errors={errors}
                      onValueChange={(newValue) => {
                        setValue(newValue);
                      }}
                      label={t(dict.categoryLabel)}
                      categoryMap={categoryMap}
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

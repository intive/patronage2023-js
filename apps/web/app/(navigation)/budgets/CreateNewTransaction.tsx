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

type CreateNewTransactionProps = {
  type: string;
  onClose: () => void;
  budgetId: string | undefined;
};

type TransactionType = {
  type: string;
  id?: string;
  name: string;
  value: number | string;
  category: string;
  transactionDate: number | null;
};

export const CreateNewTransaction = ({
  type,
  onClose,
  budgetId,
}: CreateNewTransactionProps) => {
  const { t, dict } = useTranslate("CreateNewTransactionModal");

  const [newTransaction, setNewTransaction] = useState<TransactionType>({
    // id: randomUUID,
    type: type,
    name: "",
    value: "",
    category: "",
    transactionDate: null,
  });

  const setAmount = (amount: number) => {
    if (type === "Expense") {
      const value = -1 * amount;
      setNewTransaction({ ...newTransaction, value });
    } else {
      setNewTransaction({ ...newTransaction, value: amount });
    }
  };

  const onSelectDate = (date: Date | null) => {
    date
      ? setNewTransaction({
          ...newTransaction,
          transactionDate: date.getTime(),
        })
      : setNewTransaction({ ...newTransaction, transactionDate: null });
  };

  const handleSubmit = () => {
    console.log(newTransaction);
    onClose();
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
        <Form onSubmit={handleSubmit}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled fullHeight={fullHeight}>
                <ParagraphStyled>{t(dict.details)}</ParagraphStyled>
                <Field
                  name="transaction-name"
                  initialValue={newTransaction.name}
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
                        setNewTransaction({
                          ...newTransaction,
                          name: e.currentTarget.value,
                        });
                        setValue(e.currentTarget.value);
                      }}
                      onInputCleared={() => setValue("")}
                    />
                  )}
                </Field>
                <Field
                  name="amount"
                  initialValue={newTransaction.value}
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
                      name="amount"
                      type="number"
                      label={t(dict.amountLabel)}
                      value={value}
                      hasError={errors.length > 0}
                      onChange={(e) => {
                        setAmount(parseFloat(e.currentTarget.value));
                        setValue(parseFloat(e.currentTarget.value));
                      }}
                      supportingLabel={errors.length ? errors : null}
                      onInputCleared={() => setValue("")}
                    />
                  )}
                </Field>
                <Field
                  name="category"
                  initialValue={newTransaction.category}
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
                        setNewTransaction({
                          ...newTransaction,
                          category: newValue,
                        });
                      }}
                      label={t(dict.categoryLabel)}
                    />
                  )}
                </Field>
                <Field
                  name="date-start"
                  initialValue={
                    newTransaction.transactionDate
                      ? new Date(newTransaction.transactionDate)
                      : null
                  }
                  onSubmitValidate={z.date({
                    invalid_type_error: t(dict.errors.selectDate),
                  })}
                  onChangeValidate={z.date({
                    invalid_type_error: t(dict.errors.selectDate),
                  })}>
                  {({ setValue, errors }) => (
                    <DatePickerWrapperStyled>
                      <CustomDatePicker
                        hasError={errors.length > 0}
                        label={t(dict.dateLabel)}
                        selected={
                          newTransaction.transactionDate
                            ? new Date(newTransaction.transactionDate)
                            : null
                        }
                        onSelect={(date) => {
                          setValue(date);
                          onSelectDate(date);
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

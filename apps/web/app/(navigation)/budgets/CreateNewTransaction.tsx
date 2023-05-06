"use client";
import { Field, Form } from "houseform";
import { useState } from "react";
import { Button, CustomDatePicker, Input, Modal, Separator } from "ui";
import { z } from "zod";
import {
  ButtonWrapperStyled,
  DatePickerErrorStyled,
  DatePickerWrapperStyled,
  FormWrapper,
  ParagraphStyled,
  SeparatorStyled,
} from "./CreateNewTransactionStyled";
import { useTranslate } from "lib/hooks";

type CreateNewTransactionProps = {
  type: string;
  onClose: () => void;
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
}: CreateNewTransactionProps) => {
  const { t, dict } = useTranslate("CreateNewTransactionModal");

  const [newTransaction, setNewTransaction] = useState<TransactionType>({
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

  return (
    <Modal onClose={onClose} header={getHeader(type)}>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}>
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
                    z.string().nonempty({ message: t(dict.errors.notEmpty) }),
                    z
                      .number()
                      .positive({ message: t(dict.errors.graterThanZero) }),
                  ])}
                  onChangeValidate={z.union([
                    z.string().nonempty({ message: t(dict.errors.notEmpty) }),
                    z
                      .number()
                      .positive({ message: t(dict.errors.graterThanZero) }),
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
                <Field name="category" initialValue={""}>
                  {({ value, setValue, onBlur }) => (
                    <Input label={`Category`}></Input>
                  )}
                </Field>
                <div style={{ width: "50%", marginBottom: "24px" }}>
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
                        <DatePickerErrorStyled>
                          {errors[0]}
                        </DatePickerErrorStyled>
                      </DatePickerWrapperStyled>
                    )}
                  </Field>
                </div>
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

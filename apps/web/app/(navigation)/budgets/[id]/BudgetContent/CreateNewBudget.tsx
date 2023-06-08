"use client";

import { useState } from "react";
import { Form, Field } from "houseform";
import { useAtomValue } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import {
  Button,
  CustomDatePicker,
  IconPicker,
  Input,
  Modal,
  Select,
  ErrorMessage,
} from "ui";
import { IconType } from "ui/Icon";
import { SelectLabelHiddenInTrigger } from "ui/Select/Select.styles";
import {
  FormWrapperStyled,
  ErrorMessageWrapper,
  ParagraphStyled,
  InputWrapperHalfStyled,
  InputWrapperFullStyled,
  InputWrapperFullFlex,
  TextareaStyled,
  SeparatorStyled,
  ButtonWrapperStyled,
  SeparatorStyledTop,
  IconPickerStyled,
  TextareaErrorStyled,
  TextAreaWrapperStyled,
  DatePickerWrapperStyled,
  DatePickerErrorStyled,
  ContentStyled,
  InputWrapperHalfStyledCurrency,
  CurrencyTagStyled,
} from "./CreateNewBudget.styled";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "lib/validations/useValidateBudgetModal";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import useSuperfetch from "lib/hooks/useSuperfetch";
import { currency } from "lib/currency";
import { currencyAtom } from "store";

type NewBudget = {
  onClose: Function;
};

type newBudgetType = {
  name: string;
  limit: {
    value: number;
    currency: string;
  };
  period: {
    startDate: string;
    endDate: string;
  };
  description: string;
  iconName: string;
};

export const icons: IconType[] = [
  "savings",
  "directions_car",
  "payments",
  "subscriptions",
  "shopping_cart",
  "home",
  "wallet",
  "error",
  "help",
];

export const CreateNewBudget = ({ onClose }: NewBudget) => {
  const [selectedIcon, setSelectedIcon] = useState<IconType>("savings");
  const [errorMsg, setErrorMsg] = useState("");

  const { t, dict } = useTranslate("AddNewBudgetModal");
  const { hasScrollbar } = useHasScrollBar();
  const deafultCurrency = useAtomValue(currencyAtom);

  const {
    checkNameOnChange,
    checkNameOnSubmit,
    checkCurrency,
    checkLimit,
    checkDescription,
    checkDate,
  } = useValidateBudgetModal("AddNewBudgetModal");

  const convertDate = (date: Date | null) => {
    return date ? date.toISOString() : "";
  };

  const queryClient = useQueryClient();

  const fetch = useSuperfetch();

  const sendBudget = useMutation(
    (budget: newBudgetType) =>
      fetch(`${env.NEXT_PUBLIC_API_URL}budgets`, {
        method: "POST",
        body: budget,
      }),
    {
      onSuccess: (data) => {
        switch (data.httpStatus) {
          case 201:
            queryClient.invalidateQueries([
              "budgetsList",
              { searchValue: "", sortAscending: true },
            ]);
            queryClient.invalidateQueries(["exportedCsvUri"]);
            onClose();
            break;
          case 400:
            setErrorMsg(t(dict.errors.error400));
            break;
          case 401:
            setErrorMsg(t(dict.errors.error401));
            break;
          default:
            setErrorMsg(t(dict.errors.errorDefault));
            return;
        }
      },
      onError: () => {
        setErrorMsg(t(dict.errors.errorDefault));
        return;
      },
    }
  );

  const handleSubmit = (values: Record<string, any>) => {
    const newBudget: newBudgetType = {
      name: values["budget-name"],
      limit: {
        value: values["budget-limit"],
        currency: values.currency,
      },
      period: {
        startDate: convertDate(values["start-date"]),
        endDate: convertDate(values["end-date"]),
      },
      description: values.description,
      iconName: selectedIcon,
    };
    console.log(JSON.stringify(newBudget));
    sendBudget.mutate(newBudget);
  };

  const closeErrorMessage = () => {
    setErrorMsg("");
  };

  return (
    <Modal
      header={t(dict.title)}
      onClose={() => onClose && onClose()}
      fullHeight>
      <ErrorMessageWrapper>
        {errorMsg && (
          <ErrorMessage message={errorMsg} onClose={closeErrorMessage} />
        )}
      </ErrorMessageWrapper>
      <SeparatorStyledTop />
      <FormWrapperStyled defaultValue="settings">
        <Form onSubmit={(values) => handleSubmit(values)}>
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <ContentStyled>
                <ParagraphStyled>{t(dict.paragraphs.details)}</ParagraphStyled>
                <IconPickerStyled>
                  <IconPicker
                    defaultIcon={selectedIcon}
                    icons={icons}
                    onSelect={(icon) => {
                      setSelectedIcon(icon);
                    }}
                  />
                </IconPickerStyled>
                <InputWrapperFullStyled>
                  <Field
                    name="budget-name"
                    initialValue={""}
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
                            setValue(e.currentTarget.value);
                          }}
                          onInputCleared={() => setValue("")}
                          label={t(dict.inputNames.budgetName)}>
                          {""}
                        </Input>
                      );
                    }}
                  </Field>
                </InputWrapperFullStyled>
                <InputWrapperHalfStyled>
                  <Field
                    name="budget-limit"
                    onChangeValidate={checkLimit}
                    onSubmitValidate={checkLimit}>
                    {({ value, setValue, errors }) => (
                      <Input
                        value={value}
                        hasError={errors.length > 0}
                        onChange={(e) => {
                          const roundedValue =
                            Math.round(
                              parseFloat(e.currentTarget.value) * 100
                            ) / 100;
                          if (e.currentTarget.value) {
                            setValue(roundedValue);
                          } else setValue(null);
                        }}
                        supportingLabel={errors.length ? errors : null}
                        label={t(dict.inputNames.budgetLimit)}
                        name="budget-limit"
                        type="number"
                        onInputCleared={() => setValue(0)}
                      />
                    )}
                  </Field>
                </InputWrapperHalfStyled>
                <InputWrapperHalfStyledCurrency>
                  <Field
                    name="currency"
                    initialValue={deafultCurrency}
                    onSubmitValidate={checkCurrency}
                    onChangeValidate={checkCurrency}>
                    {({ value, setValue, errors }) => (
                      <Select
                        items={currency.map((currency) => ({
                          label: (
                            <>
                              <CurrencyTagStyled>{currency}</CurrencyTagStyled>
                              <SelectLabelHiddenInTrigger>
                                {t(dict.currencyNames[currency])}
                              </SelectLabelHiddenInTrigger>
                            </>
                          ),
                          value: currency,
                        }))}
                        onValueChange={(value) => setValue(value)}
                        hasIcon
                        value={value}
                        id="currency"
                        label={t(dict.inputNames.currency)}
                        error={errors[0]}
                        hasScrollbar={hasScrollbar}
                        sideOffset={2}
                      />
                    )}
                  </Field>
                </InputWrapperHalfStyledCurrency>
                <Field
                  name="description"
                  initialValue={""}
                  onSubmitValidate={checkDescription}
                  onChangeValidate={checkDescription}>
                  {({ value, setValue, errors }) => {
                    return (
                      <TextAreaWrapperStyled>
                        <TextareaStyled
                          id="description"
                          name="description"
                          placeholder={""}
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
                          {errors[0]}
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
                    onSubmitValidate={checkDate}
                    onChangeValidate={(val, form) => {
                      const start = val! && val.getTime();
                      const end =
                        form.getFieldValue("start-date")!.value &&
                        form.getFieldValue("start-date")!.value.getTime();

                      if (start && end) {
                        if (start < end)
                          return Promise.reject(t(dict.errors.dateBeforeStart));
                      }
                      return Promise.resolve(true);
                    }}>
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

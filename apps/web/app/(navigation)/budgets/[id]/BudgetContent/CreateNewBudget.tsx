"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { ErrorMessage } from "ui";

import {
  Button,
  CurrencySelect,
  CustomDatePicker,
  IconPicker,
  Input,
  Modal,
} from "ui";
import { IconType } from "ui/Icon";
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
  // SettingsTab,
} from "./CreateNewBudget.styled";
import { Form, Field } from "houseform";
import { useTranslate } from "lib/hooks";
import { useValidateBudgetModal } from "lib/validations/useValidateBudgetModal";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import useSuperfetch from "lib/hooks/useSuperfetch";

type NewBudget = {
  onClose: Function;
};

type newBudgetType = {
  name: string;
  limit: number | string;
  description: string;
  icon: string;
  dateStart: string;
  dateEnd: string;
  currency: string;
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

  const { data: session } = useSession();

  const {
    checkNameOnChange,
    checkNameOnSubmit,
    checkCurrency,
    checkLimit,
    checkDescription,
    checkDate,
  } = useValidateBudgetModal("AddNewBudgetModal");

  const [newBudget, setNewBudget] = useState<newBudgetType>({
    name: "",
    limit: "",
    description: "",
    icon: selectedIcon,
    dateStart: "",
    dateEnd: "",
    currency: "USD",
  });

  const onSelectStartDate = (date: Date | null) => {
    date
      ? setNewBudget({ ...newBudget, dateStart: date.toISOString() })
      : setNewBudget({ ...newBudget, dateStart: "" });
  };
  const onSelectEndDate = (date: Date | null) => {
    date
      ? setNewBudget({ ...newBudget, dateEnd: date.toISOString() })
      : setNewBudget({ ...newBudget, dateEnd: "" });
  };

  // required for queryClient in onSuccess
  const queryClient = useQueryClient();

  const fetch = useSuperfetch();

  const useSendBudget = () =>
    useMutation(
      () =>
        fetch(`${env.NEXT_PUBLIC_API_URL}budgets`, {
          method: "POST",
          body: {
            name: newBudget.name,
            limit: {
              value: newBudget.limit,
              currency: newBudget.currency,
            },
            period: {
              startDate: newBudget.dateStart,
              endDate: newBudget.dateEnd,
            },
            description: newBudget.description,
            iconName: newBudget.icon,
          },
        }),
      {
        onSuccess: (data) => {
          switch (data.httpStatus) {
            case 201:
              queryClient.invalidateQueries([
                "budgetsList",
                { searchValue: "", sortAscending: true },
              ]);
              onClose();
              break;
            case 400:
              setErrorMsg(t(dict.errors.error400));
              break;
            case 401:
              setErrorMsg(t(dict.errors.error401));
              break;
            default:
              alert(t(dict.errors.errorDefault));
              return;
          }
        },
      }
    );

  const { mutate: sendBudget } = useSendBudget();

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
        <Form
          onSubmit={() => {
            sendBudget();
          }}>
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
                      setNewBudget({ ...newBudget, icon });
                      setSelectedIcon(icon);
                    }}
                  />
                </IconPickerStyled>
                <InputWrapperFullStyled>
                  <Field
                    name="budget-name"
                    initialValue={newBudget.name}
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
                            setNewBudget({
                              ...newBudget,
                              name: e.currentTarget.value,
                            });
                            setValue(e.currentTarget.value);
                          }}
                          onInputCleared={() => setValue("")}
                          label={t(dict.inputNames.budgetName)}>
                          {newBudget.name}
                        </Input>
                      );
                    }}
                  </Field>
                </InputWrapperFullStyled>
                <InputWrapperHalfStyled>
                  <Field
                    name="budget-limit"
                    initialValue={newBudget.limit}
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
                            setNewBudget({
                              ...newBudget,
                              limit: roundedValue,
                            });
                            setValue(roundedValue);
                          } else setValue("");
                        }}
                        supportingLabel={errors.length ? errors : null}
                        label={t(dict.inputNames.budgetLimit)}
                        name="budget-limit"
                        type="number"
                        onInputCleared={() => setValue("")}
                      />
                    )}
                  </Field>
                </InputWrapperHalfStyled>
                <InputWrapperHalfStyledCurrency>
                  <Field
                    name="currency"
                    initialValue={newBudget.currency}
                    onSubmitValidate={checkCurrency}
                    onChangeValidate={checkCurrency}>
                    {({ value, setValue, errors }) => (
                      // WIP
                      <CurrencySelect
                        value={value}
                        id="currency"
                        label={t(dict.inputNames.currency)}
                        supportingLabel={errors[0]}
                        onValueChange={(e) => {
                          setValue(e);
                          setNewBudget({
                            ...newBudget,
                            currency: e,
                          });
                        }}
                        hasScrollbar={hasScrollbar}
                      />
                    )}
                  </Field>
                </InputWrapperHalfStyledCurrency>
                <Field
                  name="description"
                  initialValue={newBudget.description}
                  onSubmitValidate={checkDescription}
                  onChangeValidate={checkDescription}>
                  {({ value, setValue, errors }) => {
                    return (
                      <TextAreaWrapperStyled>
                        <TextareaStyled
                          id="description"
                          name="description"
                          placeholder={newBudget.description}
                          label={t(dict.inputNames.description)}
                          value={value}
                          hasError={errors.length > 0}
                          onChange={(e) => {
                            setNewBudget({
                              ...newBudget,
                              description: e.currentTarget.value,
                            });
                            setValue(e.currentTarget.value);
                          }}
                        />
                        <TextareaErrorStyled>{errors[0]}</TextareaErrorStyled>
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
                    initialValue={
                      newBudget.dateStart ? new Date(newBudget.dateStart) : null
                    }
                    onSubmitValidate={checkDate}
                    onChangeValidate={checkDate}>
                    {({ setValue, errors }) => (
                      <DatePickerWrapperStyled>
                        <CustomDatePicker
                          hasError={errors.length > 0}
                          label={t(dict.inputNames.startDate)}
                          selected={
                            newBudget.dateStart
                              ? new Date(newBudget.dateStart)
                              : null
                          }
                          onSelect={(date) => {
                            setValue(date);
                            onSelectStartDate(date);
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
                    initialValue={
                      newBudget.dateEnd ? new Date(newBudget.dateEnd) : null
                    }
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
                    {({ setValue, errors }) => (
                      <DatePickerWrapperStyled>
                        <CustomDatePicker
                          hasError={errors.length > 0}
                          label={t(dict.inputNames.endDate)}
                          selected={
                            newBudget.dateEnd
                              ? new Date(newBudget.dateEnd)
                              : null
                          }
                          onSelect={(date) => {
                            setValue(date);
                            onSelectEndDate(date);
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

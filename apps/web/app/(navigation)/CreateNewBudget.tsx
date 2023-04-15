"use client";

import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { useState } from "react";
import { Button, CustomDatePicker, IconPicker, Input, Modal } from "ui";
import { IconType } from "ui/Icon";
import {
  TabsContentStyled,
  TabsListStyled,
  TabsStyled,
  TabsTriggerStyled,
  ParagraphStyled,
  InputWrapperHalfStyled,
  InputWrapperFullStyled,
  InputWrapperFullFlex,
  TextareaStyled,
  SeparatorStyled,
  ButtonWrapperStyled,
  SeparatorStyledTop,
  IconPickerStyled,
} from "./CreateNewBudget.styled";
import { Form, Field } from "houseform";
import { z } from "zod";

type NewBudget = {
  onClose?: Function;
};

export const CreateNewBudget = ({ onClose }: NewBudget) => {
  const [defaultValue, setDefaultValue] = useState("settings");
  const [selectedIcon, setSelectedIcon] = useState<Icon | undefined>(
    "settings"
  );

  const icons: IconType[] = [
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

  //mocked existing user budgets
  const loggedUserExistingBudgets = ["smutnarzaba", "frytki123"];

  return (
    <Modal header="New budget" onClose={() => onClose && onClose()}>
      <SeparatorStyledTop />
      <TabsStyled defaultValue={defaultValue}>
        <TabsListStyled>
          <TabsTriggerStyled value="settings">Settings</TabsTriggerStyled>
          {/* remove disabled when you want to add second tab content */}
          <TabsTriggerStyled value="share" disabled>
            Share
          </TabsTriggerStyled>
        </TabsListStyled>
        <TabsContentStyled value="settings">
          {/* form */}
          <Form onSubmit={(values) => alert(JSON.stringify(values))}>
            {({ isValid, submit }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}>
                <ParagraphStyled>Details</ParagraphStyled>
                <IconPickerStyled>
                  <IconPicker
                    defaultIcon="savings"
                    icons={icons}
                    onSelect={(icon) => {
                      setSelectedIcon(icon);
                    }}></IconPicker>
                </IconPickerStyled>
                <InputWrapperFullStyled>
                  <Field
                    name="budget-name"
                    onSubmitValidate={z
                      .string()
                      .min(3, "Budget name must have at least 3 characters.")
                      .max(30, "Budget must not have more than 30 characters.")
                      .refine(
                        (val) => !loggedUserExistingBudgets.includes(val),
                        "Name is taken, please choose another."
                      )}
                    onChangeValidate={z.string()}>
                    {({ value, setValue, errors }) => {
                      return (
                        <Input
                          name="budget-name"
                          value={value}
                          hasError={errors.length > 0}
                          supportingLabel={errors.length ? errors : null}
                          onChange={(e) => setValue(e.currentTarget.value)}
                          onInputCleared={() => setValue("")}
                          label="Budget name"
                        />
                      );
                    }}
                  </Field>
                </InputWrapperFullStyled>
                <InputWrapperHalfStyled>
                  <Field
                    name="budget-limit"
                    onChangeValidate={z.union([
                      z
                        .string()
                        .nonempty({ message: "Please specify budget limit." }),
                      z
                        .number()
                        .positive({ message: "Must be grater than 0." }),
                    ])}
                    onSubmitValidate={z.union([
                      z
                        .string()
                        .nonempty({ message: "Please specify budget limit." }),
                      z.number().positive({
                        message: "Must be grater than 0.",
                      }),
                    ])}>
                    {({ value, setValue, errors }) => (
                      <Input
                        value={value}
                        hasError={errors.length > 0}
                        onChange={(e) => {
                          if (e.currentTarget.value) {
                            setValue(
                              Math.round(
                                parseFloat(e.currentTarget.value) * 100
                              ) / 100
                            );
                            console.log(e.currentTarget.value);
                          } else setValue("");
                        }}
                        supportingLabel={errors.length ? errors : null}
                        label="Budget limit"
                        name="budget-limit"
                        type="number"
                        onInputCleared={() => setValue("")}
                      />
                    )}
                  </Field>
                </InputWrapperHalfStyled>
                <InputWrapperHalfStyled>
                  <Input label="Currency" name="currency" />
                </InputWrapperHalfStyled>
                <TextareaStyled label="Description"></TextareaStyled>
                <ParagraphStyled>Budget period</ParagraphStyled>
                <InputWrapperFullFlex>
                  <CustomDatePicker
                    lang="en"
                    placeholder="Start Date"
                    onSelect={() => {}}
                  />
                  to
                  <CustomDatePicker
                    lang="en"
                    placeholder="End Date"
                    onSelect={() => {}}
                  />
                </InputWrapperFullFlex>

                <SeparatorStyled />
                <ButtonWrapperStyled>
                  <Button onClick={submit}>Save</Button>
                </ButtonWrapperStyled>
              </form>
            )}
            {/* buttom must be out of tabs if we want to use them */}
          </Form>
          {/* end of form */}
        </TabsContentStyled>
        <TabsContentStyled value="share">Welcome to share</TabsContentStyled>
      </TabsStyled>
    </Modal>
  );
};

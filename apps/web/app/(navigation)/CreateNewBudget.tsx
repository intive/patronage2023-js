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
} from "./CreateNewBudget.styled";
import { Form, Field } from "houseform";
import { z } from "zod";

export const CreateNewBudget = ({ onClose }) => {
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

  const budgetNames = ["smutnarzaba", "frytki123"];

  return (
    <Modal header="New budget" onClose={() => onClose()}>
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
                  submit();
                }}>
                <ParagraphStyled>Details</ParagraphStyled>
                <IconPicker
                  defaultIcon="savings"
                  icons={icons}
                  onSelect={(icon) => {
                    setSelectedIcon(icon);
                  }}></IconPicker>
                <InputWrapperFullStyled>
                  <Field
                    name="budget-name"
                    onSubmitValidate={z
                      .string()
                      .min(5, "Budget name must have at least 5 letters")
                      .refine(
                        (val) => !budgetNames.includes(val),
                        "That name is already taken, please choose another."
                      )}
                    onChangeValidate={z.string()}>
                    {({ value, setValue, errors }) => {
                      return (
                        <Input
                          value={value}
                          hasError={!isValid}
                          supportingLabel={!isValid ? errors[0] : ""}
                          onChange={(e) => setValue(e.currentTarget.value)}
                          label="Budget name"
                        />
                      );
                    }}
                  </Field>
                </InputWrapperFullStyled>
                <InputWrapperHalfStyled>
                  <Input label="Budget limit" name="budget-limit"></Input>
                </InputWrapperHalfStyled>
                <InputWrapperHalfStyled>
                  <Input label="Currency" name="currency"></Input>
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

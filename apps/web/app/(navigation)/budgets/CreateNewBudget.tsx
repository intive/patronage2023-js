"use client";

import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { useState } from "react";
import {
  Button,
  CustomDatePicker,
  IconPicker,
  Input,
  Modal,
  Separator,
} from "ui";
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

export const CreateNewBudget = () => {
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

  return (
    <Modal header="New budget" onClose={() => {}}>
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
            {({ submit }) => (
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
                  <Field name="username">
                    {({ value, setValue, onBlur }) => (
                      <Input
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        label="Budget name"
                        name="budget-name"
                        onBlur={() => console.log("blurred")}
                      />
                    )}
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

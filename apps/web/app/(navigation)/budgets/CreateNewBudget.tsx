"use client";

import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { useState } from "react";
import { CustomDatePicker, IconPicker, Input } from "ui";
import { IconType } from "ui/Icon";
import {
  CardStyled,
  ModalStyled,
  TabsContentStyled,
  TabsListStyled,
  TabsStyled,
  TabsTriggerStyled,
  ParagraphStyled,
  InputWrapperHalfStyled,
  InputWrapperFullStyled,
  InputWrapperFullFlex,
  TextareaStyled,
} from "./CreateNewBudget.styled";

// import { Form } from "houseform";

export const CreateNewBudget = () => {
  const [defaultValue, setDefaultValue] = useState("settings");
  const [selectedIcon, setSelectedIcon] = useState<Icon | undefined>("savings");

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
    <ModalStyled>
      <CardStyled>
        <TabsStyled defaultValue={defaultValue}>
          <TabsListStyled>
            <TabsTriggerStyled value="settings">Settings</TabsTriggerStyled>
            {/* remove disabled when you want to add second tab content */}
            <TabsTriggerStyled value="share" disabled>
              Share
            </TabsTriggerStyled>
          </TabsListStyled>
          <TabsContentStyled value="settings">
            <ParagraphStyled>Details</ParagraphStyled>
            <IconPicker
              defaultIcon="savings"
              icons={icons}
              onSelect={(icon) => {
                setSelectedIcon(icon);
              }}></IconPicker>
            <InputWrapperFullStyled>
              <Input label="Budget name" name="budget-name"></Input>
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
          </TabsContentStyled>
          <TabsContentStyled value="share">Welcome to share</TabsContentStyled>
        </TabsStyled>
      </CardStyled>
    </ModalStyled>
  );
};

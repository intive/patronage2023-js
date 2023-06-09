"use client";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { ReactElement } from "react";
import { device } from "lib/media-queries";

interface Item {
  ComponentToRender?: ReactElement;
  id: string;
}

type DropdownMenuProps = {
  trigger: ReactElement;
  items: Item[];
};

const DropdownMenuTriggerStyled = styled(RadixDropdownMenu.Trigger)`
  border: none;
  cursor: pointer;
  width: 2.5em;
  height: 2.5em;
  border-radius: 8px;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.dropdownMenu.outlineFocus};
  }
  ${device.tablet} {
    width: 4em;
    height: 4em;
  }
`;

const DropdownMenuContentStyled = styled(RadixDropdownMenu.Content)`
  margin: 8px;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
  border: 1px solid ${({ theme }) => theme.dropdownMenu.border};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  max-height: 250px;
  background-color: white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.textarea.disabled};
    border-radius: 10px;
    width: 6px;
    margin-bottom: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.modal.closeButton};
    border-radius: 10px;
  }
`;

const DropdownColorMenuStyled = styled(DropdownMenuContentStyled)`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, 1fr));
  z-index: 100;
`;

export const DropdownMenuItemStyled = styled(RadixDropdownMenu.Item)`
  padding: 6px 11px;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  &:focus {
    border-color: ${({ theme }) => theme.dropdownMenu.outlineFocus};
    background-color: ${({ theme }) => theme.dropdownMenu.activeBackground};
    outline: 0;
  }
  &:hover {
    background-color: ${({ theme }) => theme.dropdownMenu.activeBackground};
    outline: 0;
    border: 1px solid transparent;
  }
`;
export const CategoryDropdown = ({ trigger, items }: DropdownMenuProps) => {
  return (
    <RadixDropdownMenu.Root modal={false}>
      <DropdownMenuTriggerStyled>{trigger}</DropdownMenuTriggerStyled>
      <RadixDropdownMenu.Portal>
        <DropdownMenuContentStyled side="bottom">
          {items.map((item) => {
            return (
              <DropdownMenuItemStyled key={item.id}>
                {item.ComponentToRender}
              </DropdownMenuItemStyled>
            );
          })}
        </DropdownMenuContentStyled>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

export const ColorDropdown = ({ trigger, items }: DropdownMenuProps) => {
  return (
    <RadixDropdownMenu.Root modal={false}>
      <DropdownMenuTriggerStyled asChild>{trigger}</DropdownMenuTriggerStyled>
      <RadixDropdownMenu.Portal>
        <DropdownColorMenuStyled side="bottom">
          {items.map((item) => {
            return (
              <DropdownMenuItemStyled key={item.id}>
                {item.ComponentToRender}
              </DropdownMenuItemStyled>
            );
          })}
        </DropdownColorMenuStyled>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

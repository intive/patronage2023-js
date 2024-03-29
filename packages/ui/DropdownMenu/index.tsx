"use client";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon, IconType } from "ui";
import styled, { css } from "styled-components";
import { ReactElement } from "react";

//type for every item in DropdownMenu
type DropdownMenuSingleItem = {
  ComponentToRender?: ReactElement;
  id: string;
};

type DropdownMenuProps = {
  items: Array<DropdownMenuSingleItem>;
  side: "top" | "right" | "bottom" | "left";
  ariaLabel?: string;
  className?: string;
  icon: IconType;
  limit?: string;
};

interface MenuProps {
  limit?: string;
}

const DropdownMenuTriggerStyled = styled(RadixDropdownMenu.Trigger)`
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 8px;
  height: 28px;
  width: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.dropdownMenu.outlineFocus};
  }
`;

const IconStyled = styled(Icon)`
  color: ${({ theme }) => theme.dropdownMenu.iconColor};
`;

const DropdownMenuContentStyled = styled(RadixDropdownMenu.Content)<MenuProps>`
  margin: 8px;
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
  border: 1px solid ${({ theme }) => theme.dropdownMenu.border};
  border-radius: 16px;
  ${({ limit }) =>
    limit
      ? css`
          height: ${limit};
          overflow-y: auto;
        `
      : css`
          overflow: hidden;
        `}
  background-color: white;
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

export const DropdownMenu = ({
  items,
  side,
  ariaLabel,
  className,
  icon,
  limit,
}: DropdownMenuProps) => {
  return (
    <RadixDropdownMenu.Root modal={false}>
      <DropdownMenuTriggerStyled asChild className={className}>
        <button aria-label={ariaLabel}>
          <IconStyled icon={icon} />
        </button>
      </DropdownMenuTriggerStyled>
      <RadixDropdownMenu.Portal>
        <DropdownMenuContentStyled side={side} limit={limit}>
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

"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon } from "ui";
import styled from "styled-components";

type ThreeDotsProps = {
  items: Array<string>;
} & React.HTMLProps<HTMLSelectElement>;

const DropdownMenuTriggerStyled = styled(DropdownMenu.Trigger)`
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  margin-left: 8px;
`;

const DropdownMenuItemStyled = styled(DropdownMenu.Item)`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;

  &:focus {
    outline: ${({ theme }) => theme.threeDots.outlineFocus};
  }
  &:hover {
    background: ${({ theme }) => theme.threeDots.backgroundHover};
  }
`;

export const ThreeDots = ({ items }: ThreeDotsProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenuTriggerStyled asChild>
        <button>
          <Icon icon="more_vert" color="#7E7E7E"/>
        </button>
      </DropdownMenuTriggerStyled>
      <DropdownMenu.Portal>
        <DropdownMenuContentStyled side="right">
          {items.map((item) => {
            return <DropdownMenuItemStyled>{item}</DropdownMenuItemStyled>;
          })}
        </DropdownMenuContentStyled>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

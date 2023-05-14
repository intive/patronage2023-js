import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { device } from "lib/media-queries";
import styled from "styled-components";
import { Icon } from "ui";

interface Props {
  label: React.ReactNode;
  items: { id: string; label: string; onClick: () => void }[];
}
const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
  border-radius: 16px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.card.border};
  ${device.tablet} {
    width: 288px;
  }
`;

const DropdownMenuItemStyled = styled(DropdownMenu.Item)`
  padding: 10px;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;

  ${device.tablet} {
    padding: 16px;
    font-size: 16px;
  }

  &:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  &:focus {
    border-color: ${({ theme }) => theme.input.focus};
    background-color: ${({ theme }) =>
      theme.transactionDropdownMenu.activeBackground};
    outline: none;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.transactionDropdownMenu.activeBackground};
    border: 1px solid transparent;
  }
`;

const ButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  color: #7e7e7e;
  width: fit-content;
`;

const QueryDropdown = ({ label, items }: Props) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <ButtonStyled>
          {label}
          <Icon icon="arrow_drop_down" />
        </ButtonStyled>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContentStyled align="center">
          {items.map((item) => (
            <DropdownMenuItemStyled key={item.id} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItemStyled>
          ))}
        </DropdownMenuContentStyled>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default QueryDropdown;

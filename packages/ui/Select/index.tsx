import { ReactNode, useState } from "react";
import styled, { css } from "styled-components";
import * as AtomicSelect from "@radix-ui/react-select";
import { Icon } from "ui";

type SelectItem = {
  label: ReactNode;
  value: string;
};

export type SelectProps = {
  items: Array<SelectItem>;
  onValueChange: (value: string) => void;
  hasIcon: boolean;
  label: string;
  className?: string;
  error?: string;
  value?: string;
  hasScrollbar?: boolean;
  id?: string;
};

export const Select = ({
  items,
  onValueChange,
  hasIcon,
  label,
  className,
  error,
  value,
  hasScrollbar,
  id,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AtomicSelect.Root
      onValueChange={onValueChange}
      value={value || undefined}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <SelectTriggerStyled
        className={className}
        $hasError={Boolean(error)}
        id={id}>
        {value && <TriggerLabelStyled>{label}</TriggerLabelStyled>}
        <AtomicSelect.Value placeholder={label} />
        {hasIcon && (
          <SelectIconStyled>
            <Icon
              icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
              iconSize={27}
            />
          </SelectIconStyled>
        )}
      </SelectTriggerStyled>
      {error && <SupportingLabelStyled>{error}</SupportingLabelStyled>}

      <SelectPortalStyled className={hasScrollbar ? "radix-scroll" : ""}>
        <SelectContentStyled position="popper">
          <AtomicSelect.ScrollUpButton />
          <AtomicSelect.Viewport>
            {items.map((item) => (
              <SelectItemStyled value={item.value} key={item.value}>
                <AtomicSelect.ItemText>{item.label}</AtomicSelect.ItemText>
              </SelectItemStyled>
            ))}
          </AtomicSelect.Viewport>
          <AtomicSelect.ScrollDownButton />
        </SelectContentStyled>
      </SelectPortalStyled>
    </AtomicSelect.Root>
  );
};

export const SelectLabelHiddenInTrigger = styled.span``;

export const SelectTriggerStyled = styled(AtomicSelect.Trigger)<{
  $hasError: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin-bottom: ${({ $hasError }) => ($hasError ? "0" : "18px")};
  width: 100%;
  height: 56px;
  color: ${({ theme }) => theme.categorySelect.neutral};
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 2px ${({ theme }) => theme.categorySelect.border};
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 200ms ease-out;
  position: relative;

  ${({ $hasError }) =>
    $hasError &&
    css`
      color: ${({ theme }) => theme.categorySelect.error};
      border: solid 2px ${({ theme }) => theme.categorySelect.error};
    `}

  :focus {
    transition: border-color 200ms ease-out;
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }

  ${SelectLabelHiddenInTrigger} {
    display: none;
  }
`;

export const TriggerLabelStyled = styled.div`
  position: absolute;
  margin-top: -56px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.input.labelBackground};
  padding-left: 4px;
  padding-right: 4px;
`;

export const SelectIconStyled = styled(AtomicSelect.Icon)`
  color: ${({ theme }) => theme.categorySelect.icon};
  margin-top: 4px;
`;

export const SelectPortalStyled = styled(AtomicSelect.Portal)`
  z-index: 100;
`;

export const SelectContentStyled = styled(AtomicSelect.Content)`
  border-radius: 1em;
  overflow: hidden;
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
`;

export const SelectItemStyled = styled(AtomicSelect.Item)`
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 8px 16px;

  &:focus {
    color: ${({ theme }) => theme.input.main};
    background-color: ${({ theme }) => theme.categorySelect.focusBackground};
    &:first-child {
      border-radius: 1em 1em 0 0;
    }
    &:last-child {
      border-radius: 0 0 1em 1em;
    }
    &:hover {
      outline: transparent;
    }
  }
`;

export const SupportingLabelStyled = styled.div`
  color: ${({ theme }) => theme.categorySelect.error};
  font-weight: 400;
  font-size: 12px;
  margin-left: 14px;
`;

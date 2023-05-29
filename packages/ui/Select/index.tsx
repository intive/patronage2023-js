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
  placeholder: string;
  hasIcon: boolean;
  sideOffset: number;
  ariaLabel: string;
  className?: string;
};

export const Select = ({
  items,
  placeholder,
  hasIcon,
  // sideOffset,
  ariaLabel,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderIcon = () => {
    if (hasIcon) {
      return (
        <SelectIconStyled>
          <Icon
            icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconSize={27}
          />
        </SelectIconStyled>
      );
    }
  };

  return (
    <AtomicSelect.Root
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <SelectTriggerStyled aria-label={ariaLabel} className={className}>
        <AtomicSelect.Value placeholder={placeholder} />
        {renderIcon()}
      </SelectTriggerStyled>

      <SelectPortalStyled>
        <SelectContentStyled sideOffset={50}>
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

// export const SelectTriggerWrapperStyled = styled.div`
//   position: relative;
// `;

export const SelectTriggerStyled = styled(AtomicSelect.Trigger)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin-bottom: 18px;
  width: 100%;
  height: 56px;
  color: ${({ theme }) => theme.categorySelect.neutral};
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 2px ${({ theme }) => theme.categorySelect.border};
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 200ms ease-out;

// poziomki tu były

  :focus {
    transition: border-color 200ms ease-out;
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }
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

export const CategoryWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const CategoryNameStyled = styled.p`
  height: 100%;
  padding: 0 16px;
`;

// export const SupportingLabelStyled = styled.div<{ hasError: boolean }>`
//   position: absolute;
//   top: 56px;
//   color: ${({ hasError }) =>
//     hasError
//       ? ({ theme }) => theme.categorySelect.error
//       : ({ theme }) => theme.categorySelect.neutral};
//   font-weight: 400;
//   font-size: 12px;
//   margin: 4px 10px 0 10px;
// `;


// poziomki:

// ${({ $hasError }) =>
// $hasError &&
// css`
//   color: ${({ theme }) => theme.categorySelect.error};
//   border: solid 2px ${({ theme }) => theme.categorySelect.error};
// `}

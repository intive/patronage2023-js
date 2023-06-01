import { ComponentType, ReactNode, useState } from "react";
import * as AtomicSelect from "@radix-ui/react-select";
import { Icon } from "ui";
import {
  SelectTriggerStyled,
  TriggerLabelStyled,
  SelectIconStyled,
  SupportingLabelStyled,
  SelectPortalStyled,
  SelectContentStyled,
  SelectItemStyled,
  SelectItemLabelWrapperStyled,
  SelectScrollUpButtonStyled,
  SelectScrollDownButtonStyled,
} from "./Select.styles";

type SelectItem = {
  label: ReactNode;
  value: string;
};

export type SelectProps = {
  items: Array<SelectItem>;
  onValueChange: (value: string) => void;
  hasIcon: boolean;
  label: string;
  sideOffset?: number;
  className?: string;
  error?: string;
  value?: string;
  hasScrollbar?: boolean;
  id?: string;
  SelectItem?: ComponentType<AtomicSelect.SelectItemProps>;
};

export const Select = ({
  items,
  onValueChange,
  hasIcon,
  label,
  sideOffset,
  className,
  error,
  value,
  hasScrollbar,
  id,
  SelectItem = SelectItemStyled,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AtomicSelect.Root
      onValueChange={onValueChange}
      value={value || undefined}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <div>
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
                iconSize={24}
              />
            </SelectIconStyled>
          )}
        </SelectTriggerStyled>
        {error && <SupportingLabelStyled>{error}</SupportingLabelStyled>}
      </div>
      <SelectPortalStyled className={hasScrollbar ? "radix-scroll" : ""}>
        <SelectContentStyled position="popper" sideOffset={sideOffset}>
          <SelectScrollUpButtonStyled>
            <Icon icon="keyboard_arrow_up" iconSize={24} color="#515151" />
          </SelectScrollUpButtonStyled>
          <AtomicSelect.Viewport>
            {items.map((item) => (
              <SelectItem value={item.value} key={item.value}>
                <AtomicSelect.ItemText>
                  <SelectItemLabelWrapperStyled>
                    {item.label}
                  </SelectItemLabelWrapperStyled>
                </AtomicSelect.ItemText>
              </SelectItem>
            ))}
          </AtomicSelect.Viewport>
          <SelectScrollDownButtonStyled>
            <Icon icon="keyboard_arrow_down" iconSize={24} color="#515151" />
          </SelectScrollDownButtonStyled>
        </SelectContentStyled>
      </SelectPortalStyled>
    </AtomicSelect.Root>
  );
};

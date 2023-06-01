import { ReactNode, useState } from "react";
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
  SelectItemLabelWrapperStyled
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
              iconSize={24}
            />
          </SelectIconStyled>
        )}
      </SelectTriggerStyled>
      {error && <SupportingLabelStyled>{error}</SupportingLabelStyled>}

      <SelectPortalStyled className={hasScrollbar ? "radix-scroll" : ""}>
        <SelectContentStyled position="popper" sideOffset={sideOffset}>
          <AtomicSelect.ScrollUpButton />
          <AtomicSelect.Viewport>
            {items.map((item) => (
              <SelectItemStyled value={item.value} key={item.value}>
                <AtomicSelect.ItemText>
                  <SelectItemLabelWrapperStyled>
                    {item.label}
                  </SelectItemLabelWrapperStyled>
                </AtomicSelect.ItemText>
              </SelectItemStyled>
            ))}
          </AtomicSelect.Viewport>
          <AtomicSelect.ScrollDownButton />
        </SelectContentStyled>
      </SelectPortalStyled>
    </AtomicSelect.Root>
  );
};

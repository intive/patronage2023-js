import { ReactNode, useState } from "react";
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
  ariaLabel: string;
  className?: string;
};

export const Select = ({
  items,
  placeholder,
  hasIcon,
  ariaLabel,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderIcon = () => {
    if (hasIcon) {
      return (
        <AtomicSelect.Icon>
          <Icon
            icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconSize={27}
          />
        </AtomicSelect.Icon>
      );
    }
  };

  return (
    <AtomicSelect.Root
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <AtomicSelect.Trigger aria-label={ariaLabel} className={className}>
        <AtomicSelect.Value placeholder={placeholder} />
        {renderIcon()}
      </AtomicSelect.Trigger>

      <AtomicSelect.Portal>
        <AtomicSelect.Content>
          <AtomicSelect.ScrollUpButton />
          <AtomicSelect.Viewport>
            {items.map((item) => (
              <AtomicSelect.Item value={item.value} key={item.value}>
                <AtomicSelect.ItemText>{item.label}</AtomicSelect.ItemText>
              </AtomicSelect.Item>
            ))}
          </AtomicSelect.Viewport>
          <AtomicSelect.ScrollDownButton />
        </AtomicSelect.Content>
      </AtomicSelect.Portal>
    </AtomicSelect.Root>
  );
};

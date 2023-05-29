import { ReactNode } from "react";
import * as AtomicSelect from "@radix-ui/react-select";
import { CategoryIcon, Icon } from "ui";

type SelectItem = {
  componentToRender: ReactNode;
  label: string;
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
    <AtomicSelect.Root>
      <AtomicSelect.Trigger aria-label={ariaLabel} className={className}>
        <AtomicSelect.Value placeholder={placeholder} />
        {renderIcon()}
      </AtomicSelect.Trigger>

      <AtomicSelect.Portal>
        <AtomicSelect.Content>
          <AtomicSelect.ScrollUpButton />
          <AtomicSelect.Viewport>
            <AtomicSelect.Item>
              <AtomicSelect.ItemText />
              <AtomicSelect.ItemIndicator />
            </AtomicSelect.Item>

            <AtomicSelect.Group>
              <AtomicSelect.Label />
              <AtomicSelect.Item>
                <AtomicSelect.ItemText />
                <AtomicSelect.ItemIndicator />
              </AtomicSelect.Item>
            </AtomicSelect.Group>

            <AtomicSelect.Separator />
          </AtomicSelect.Viewport>
          <AtomicSelect.ScrollDownButton />
          <AtomicSelect.Arrow />
        </AtomicSelect.Content>
      </AtomicSelect.Portal>
    </AtomicSelect.Root>
  );
};

import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import {
  CategoryNameStyled,
  CategoryWrapperStyled,
  SelectContentStyled,
  SelectIconStyled,
  SelectItemStyled,
  SelectPortalStyled,
  SelectTriggerStyled,
  SelectTriggerWrapperStyled,
  SupportingLabelStyled,
} from "./CategorySelectorStyled";
import { CategoryIcon, Icon } from "ui";
import { CategoryType } from "ui/CategoryIcon";

type CategorySelectorProps = {
  onValueChange: (value: string) => void;
  label?: string;
  errors?: string[];
  categoryMap: Object;
  hasScrollbar?: boolean;
};

export const CategorySelector = ({
  errors,
  onValueChange,
  label,
  categoryMap,
  hasScrollbar,
}: CategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasErrors = errors ? errors.length > 0 : false;
  type CategoryMapType = typeof categoryMap;

  const getCategoriesItems = (categoryMap: CategoryMapType) => {
    const categories = Object.keys(categoryMap);

    return categories.map((category) => (
      <SelectItemStyled value={category} key={category}>
        <Select.ItemText>
          <CategoryWrapperStyled>
            {categoryMap[category as keyof CategoryMapType] && (
              <CategoryIcon
                small
                category={
                  categoryMap[
                    category as keyof CategoryMapType
                  ] as unknown as CategoryType
                }
              />
            )}
            {categoryMap[category as keyof CategoryMapType]?.name && (
              <CategoryNameStyled>
                {categoryMap[category as keyof CategoryMapType]?.name}
              </CategoryNameStyled>
            )}
          </CategoryWrapperStyled>
        </Select.ItemText>
      </SelectItemStyled>
    ));
  };

  return (
    <Select.Root
      name="category"
      value={undefined}
      onValueChange={onValueChange}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <SelectTriggerWrapperStyled>
        <SelectTriggerStyled $hasError={hasErrors}>
          <Select.Value placeholder={label} />
          <SelectIconStyled>
            <Icon
              icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
              iconSize={27}
            />
          </SelectIconStyled>
        </SelectTriggerStyled>
        <SupportingLabelStyled hasError={hasErrors}>
          {errors && errors.length > 0 && errors[0]}
        </SupportingLabelStyled>
      </SelectTriggerWrapperStyled>

      <SelectPortalStyled className={hasScrollbar ? "radix-scroll" : ""}>
        <SelectContentStyled position="popper">
          <Select.Viewport>{getCategoriesItems(categoryMap)}</Select.Viewport>
        </SelectContentStyled>
      </SelectPortalStyled>
    </Select.Root>
  );
};

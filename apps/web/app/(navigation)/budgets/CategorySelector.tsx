import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import {
  CategoryNameStyled,
  CategoryWrapperStyled,
  SelectContentStyled,
  SelectIconStyled,
  SelectItemStyled,
  SelectPortalStyled,
  SelectRootStyled,
  SelectTriggerStyled,
} from "./CategorySelectorStyled";
import { CategoryIcon, Icon } from "ui";
import categoryMap from "../../../lib/category-map";
import { CategoryMap } from "lib/types";
import { CategoryType } from "ui/CategoryIcon";

type CategorySelectorProps = {
  supportingLabel?: React.ReactNode;
  onValueChange?: (value: string) => void;
  label?: string;
};

const getCategoriesItems = (categoryMap: CategoryMap) => {
  const categories = Object.keys(categoryMap);

  return categories.map((category) => (
    <SelectItemStyled value={category} key={category}>
      <Select.ItemText>
        <CategoryWrapperStyled>
          {categoryMap[category] && (
            <CategoryIcon
              small
              category={categoryMap[category] as CategoryType}
            />
          )}
          {categoryMap[category]?.name && (
            <CategoryNameStyled>
              {categoryMap[category]?.name}
            </CategoryNameStyled>
          )}
        </CategoryWrapperStyled>
      </Select.ItemText>
    </SelectItemStyled>
  ));
};

export const CategorySelector = ({
  supportingLabel,
  onValueChange,
  label,
}: CategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectRootStyled
      name="category"
      value={undefined}
      onValueChange={onValueChange}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <SelectTriggerStyled>
        <Select.Value placeholder={label}></Select.Value>
        <SelectIconStyled>
          <Icon
            icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconSize={27}
          />
        </SelectIconStyled>
      </SelectTriggerStyled>

      <SelectPortalStyled>
        <SelectContentStyled position="popper">
          <Select.Viewport>
            {getCategoriesItems(categoryMap)}
            {/* {categories.map((category) => (
              <SelectItem value={category} key={category}>
                <Select.ItemText>{category}</Select.ItemText>
              </SelectItem>
            ))} */}
          </Select.Viewport>
        </SelectContentStyled>
      </SelectPortalStyled>
    </SelectRootStyled>
  );
};

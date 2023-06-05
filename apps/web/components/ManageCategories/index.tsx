"use client";
import { useAtom } from "jotai";
import { useCategoryMap } from "lib/hooks/useCategoryMap";
import { useState } from "react";
import { budgetCategories } from "store/store";
import {
  CategoryIcon,
  CategoryType,
  DropdownMenu,
  Icon,
  IconPicker,
  Input,
  Modal,
  Separator,
} from "ui";
import { CategoryRow, ContentWrapper } from "./ManageCategories.styled";
import { Button } from "./ManageCategories.styled";
import { icons } from "lib/icons";
interface Props {
  open: boolean;
  onClose: () => void;
}

const ManageCategories = ({ open, onClose }: Props) => {
  const categoryMap = useCategoryMap();
  const [defaultCategories] = useState(Object.values(categoryMap));
  const [userCategories, setUserCategories] = useAtom(budgetCategories);
  const [customCategory] = useState<Omit<CategoryType, "id">>({
    name: "",
    icon: {
      background: "",
      foreground: "",
      name: "",
    },
  });
  if (!open) return null;

  return (
    <Modal header="Manage categories" onClose={onClose}>
      <ContentWrapper>
        {/* pre-defined */}
        {defaultCategories.map((category) => (
          <CategoryRow key={category.id}>
            <CategoryIcon category={category} /> {category.name}{" "}
          </CategoryRow>
        ))}
        <Separator />
        <CategoryRow>
          <DropdownMenu
            limit="300px"
            icon="home"
            items={[
              ...icons.map((icon) => ({
                id: icon,
                ComponentToRender: (
                  <Button>
                    <Icon icon={icon} />
                  </Button>
                ),
              })),
            ]}
            side={"top"}
          />
          <input />
          <Button onClick={() => setUserCategories([...userCategories])}>
            <Icon icon="add" />
          </Button>
        </CategoryRow>
      </ContentWrapper>
    </Modal>
  );
};

export default ManageCategories;

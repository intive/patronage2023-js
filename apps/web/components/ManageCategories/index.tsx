"use client";
import { useAtom } from "jotai";
import { useState } from "react";
import { budgetCategories } from "store/store";
import {
  CategoryIcon,
  CategoryType,
  Icon,
  Modal,
  Separator,
  ErrorMessage,
  Input,
  Spinner,
} from "ui";
import {
  CategoriesWrapper,
  CategoryRow,
  ContentWrapper,
  ErrorMessageWrapper,
  StyledDiv,
  Submit,
} from "./ManageCategories.styled";
import { StyledButton } from "./ManageCategories.styled";
import { icons } from "lib/icons";
import { CategoryDropdown, ColorDropdown } from "./Dropdown";
import { colors } from "ui/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSuperfetch from "lib/hooks/useSuperfetch";
import { env } from "env.mjs";
interface Props {
  open: boolean;
  onClose: () => void;
  budgetId: string;
}

const ManageCategories = ({ open, onClose, budgetId }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [userCategories, setUserCategories] = useAtom(budgetCategories);
  const [customCategory, setCustomCategory] = useState<
    Omit<CategoryType, "categoryId">
  >({
    icon: {
      background: "",
      foreground: "",
      name: "home",
    },
    name: "",
  });
  const queryClient = useQueryClient();

  const fetch = useSuperfetch();

  const AddCategory = useMutation({
    mutationFn: () => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}budgets/${budgetId}/categories`, {
        method: "POST",
        body: {
          customCategory,
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["customCategories"]),
  });

  if (!open) return null;

  const handleClose = () => {
    onClose();
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    AddCategory.mutate();
  };

  return (
    <Modal header="Manage categories" onClose={handleClose}>
      <ContentWrapper>
        <form onSubmit={handleSubmit}>
          <ErrorMessageWrapper>
            {errorMsg && (
              <ErrorMessage
                message={errorMsg}
                onClose={() => setErrorMsg("")}
              />
            )}
          </ErrorMessageWrapper>
          <StyledDiv>
            <Input
              label="Category name"
              name="category name"
              value={customCategory.name}
              supportingLabel
              onChange={(e) =>
                setCustomCategory({
                  ...customCategory,
                  name: e.currentTarget.value,
                })
              }
            />
            <CategoryDropdown
              items={[
                ...icons.map((icon) => ({
                  id: icon,
                  ComponentToRender: (
                    <StyledButton
                      onClick={() =>
                        setCustomCategory({
                          ...customCategory,
                          icon: {
                            ...customCategory.icon,
                            name: icon,
                          },
                        })
                      }>
                      <Icon icon={icon} />
                    </StyledButton>
                  ),
                })),
              ]}
              trigger={
                <CategoryIcon
                  category={{
                    categoryId: "0",
                    ...customCategory,
                  }}
                />
              }
            />

            <ColorDropdown
              trigger={
                <StyledButton type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 576 512">
                    <path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6H386.7l42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z" />
                  </svg>
                </StyledButton>
              }
              items={[
                ...Object.values(colors)
                  //remove last item (which is transparent)
                  .slice(0, -1)
                  .map((color) => ({
                    id: color,
                    ComponentToRender: (
                      <StyledButton
                        color={color}
                        onClick={() =>
                          setCustomCategory({
                            ...customCategory,
                            icon: {
                              ...customCategory.icon,
                              background: color,
                            },
                          })
                        }
                      />
                    ),
                  })),
              ]}
            />
            <ColorDropdown
              trigger={
                <StyledButton type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 576 512">
                    <path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z" />
                  </svg>
                </StyledButton>
              }
              items={[
                ...Object.values(colors)
                  .slice(0, -1)
                  .map((color) => ({
                    id: color,
                    ComponentToRender: (
                      <StyledButton
                        color={color}
                        onClick={() =>
                          setCustomCategory({
                            ...customCategory,
                            icon: {
                              ...customCategory.icon,
                              foreground: color,
                            },
                          })
                        }
                      />
                    ),
                  })),
              ]}
            />
          </StyledDiv>
          {queryClient.isMutating() ? (
            <Spinner />
          ) : (
            <Submit disabled={!!errorMsg}>Add new category</Submit>
          )}
        </form>

        <Separator />
        <CategoriesWrapper>
          {userCategories.map((category) => (
            <CategoryRow key={category.categoryId}>
              <CategoryIcon category={category} /> {category.name}
            </CategoryRow>
          ))}
        </CategoriesWrapper>
      </ContentWrapper>
    </Modal>
  );
};

export default ManageCategories;

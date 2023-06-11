"use client";
import styled from "styled-components";
import { CategoryType, LinkComponent } from "ui";
import { CategoryFilter } from "components/CategoryFilter";
import { useTranslate } from "lib/hooks";
import { useState } from "react";
import useSuperfetch from "lib/hooks/useSuperfetch";
import ManageCategories from "components/ManageCategories";
import { useParams } from "next/navigation";
import { env } from "env.mjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { budgetCategories, categoryModalAtom } from "store/store";
const CardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const CardTitleStyled = styled.h3`
  font-size: 0.875em;
  font-weight: 600;
  color: ${({ theme }) => theme.asideCard.title};
`;

const CardSettingsButton = styled(LinkComponent)`
  font-size: 0.875em;
  text-decoration: none;
`;

interface Response {
  categories: CategoryType[];
  httpStatus: number;
}

export const AsideCardContent = () => {
  const { id: budgetId } = useParams() as { id: string };
  const fetch = useSuperfetch();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [_, setUserCategories] = useAtom(budgetCategories);

  useQuery({
    queryKey: ["customCategories"],
    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${budgetId}/categories`
      ).then((res: Response) => {
        const filteredCategories = res.categories.filter(
          //filter out default categories, why are they even returned ?!
          (cat) => cat.categoryId !== "00000000-0000-0000-0000-000000000000"
        );
        setUserCategories(filteredCategories);
        return {
          ...res,
          categories: filteredCategories,
        };
      });
    },
    enabled: !!session,
  });
  const { t, dict } = useTranslate("AsideCard");
  const [__, setModal] = useAtom(categoryModalAtom);
  return (
    <>
      <CardHeaderStyled>
        <CardTitleStyled>{t(dict.categories.title)}</CardTitleStyled>
        <CardSettingsButton onClick={() => setModal(true)}>
          {t(dict.categories.settings)}
        </CardSettingsButton>
      </CardHeaderStyled>
      <CategoryFilter />
      <ManageCategories />
    </>
  );
};

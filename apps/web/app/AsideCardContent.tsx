"use client";
import styled from "styled-components";
import { LinkComponent } from "ui";
import { CategoryFilter } from "components";
import { useTranslate } from "lib/hooks";

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

export const AsideCardContent = () => {
  const { t, dict } = useTranslate("AsideCard");
  return (
    <>
      <CardHeaderStyled>
        <CardTitleStyled>{t(dict.categories.title)}</CardTitleStyled>
        <CardSettingsButton onClick={() => {}}>
          {t(dict.categories.settings)}
        </CardSettingsButton>
      </CardHeaderStyled>
      <CategoryFilter />
    </>
  );
};

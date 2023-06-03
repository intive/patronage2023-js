"use client";
import styled from "styled-components";
import { LinkComponent, Modal } from "ui";
import { CategoryFilter } from "components/CategoryFilter";
import { useTranslate } from "lib/hooks";
import { useState } from "react";

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
  const [modal, setModal] = useState(false);
  return (
    <>
      <CardHeaderStyled>
        <CardTitleStyled>{t(dict.categories.title)}</CardTitleStyled>
        <CardSettingsButton onClick={() => setModal(true)}>
          {t(dict.categories.settings)}
        </CardSettingsButton>
      </CardHeaderStyled>
      <CategoryFilter />
      {modal && <Modal onClose={() => setModal(false)}>siema</Modal>}
    </>
  );
};

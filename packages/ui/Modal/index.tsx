import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { Card, Icon } from "ui";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  header?: string;
};

const ModalStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0px;
  z-index: 100;
`;

const BackgroundStyled = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.modal.background};
  opacity: 0.4;
`;

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 16px;
  margin: 4px;
  z-index: 1;

  @media (min-width: 768px) {
    padding: 24px;
  }

  @media (min-width: 1024px) {
    padding: 48px;
  }
`;

const HeaderWrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  min-height: 24px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const HeaderStyled = styled.h3`
  margin-right: 32px;
  margin-top: 0;
  margin-bottom: 0;
  color: ${({ theme }) => theme.modal.header};
  font-family: "Signika", sans-serif;

  @media (min-width: 768px) {
    margin-right: 48px;
  }

  @media (min-width: 1024px) {
    margin-right: 72px;
  }
`;

const CloseButtonStyled = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  color: ${({ theme }) => theme.modal.closeButton};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Modal = ({ onClose, children, header }: ModalProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  return (
    <ModalStyled>
      <BackgroundStyled onClick={onClose} />
      <CardStyled>
        <HeaderWrapperStyled>
          <HeaderStyled>{header}</HeaderStyled>
          <CloseButtonStyled onClick={onClose}>
            <Icon icon="close" />
          </CloseButtonStyled>
        </HeaderWrapperStyled>
        {children}
      </CardStyled>
    </ModalStyled>
  );
};

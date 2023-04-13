import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { Card, Icon } from "ui";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  header?: string;
};

const ModalStyled = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  z-index: 100;
  overflow: auto;
`;

const BackgroundStyled = styled.div`
  position: fixed;
  inset: 0px;
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
    padding: 32px 48px;
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
    font-size: 24px;
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
  const closeButtonReference = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  useEffect(() => {
    closeButtonReference.current?.focus();
  }, []);

  return (
    <ModalStyled>
      <BackgroundStyled onClick={onClose} />
      <CardStyled>
        <HeaderWrapperStyled>
          <HeaderStyled>{header}</HeaderStyled>
          <CloseButtonStyled onClick={onClose} ref={closeButtonReference}>
            <Icon icon="close" />
          </CloseButtonStyled>
        </HeaderWrapperStyled>
        {children}
      </CardStyled>
    </ModalStyled>
  );
};

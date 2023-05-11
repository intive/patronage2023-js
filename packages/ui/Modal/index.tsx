import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { Card, Icon } from "ui";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  header?: string;
  fullHeight?: boolean;
};

type CardExtended = {
  fullHeight?: boolean;
};

const ModalStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px;
  z-index: 100;
  overflow: auto;
`;

const BackgroundStyled = styled.div`
  position: fixed;
  inset: 0px;
  background-color: ${({ theme }) => theme.modal.background};
  opacity: 0.4;
`;

const CardStyled = styled(Card)<CardExtended>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 16px;
  z-index: 1;
  height: ${({ fullHeight }) =>
    fullHeight ? "calc(100% - 48px)" : "fit-content"};

  @media (min-width: 768px) {
    padding: 32px 48px;
  }
`;

const HeaderWrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  min-height: 36px;
  margin-bottom: 16px;

  @media (min-width: 1024px) {
    margin-bottom: 32px;
  }
`;

const HeaderStyled = styled.h3`
  margin-right: 32px;
  margin-top: 0;
  margin-bottom: 0;
  color: ${({ theme }) => theme.modal.header};
  font-family: "Signika", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;

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
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  color: ${({ theme }) => theme.modal.closeButton};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Modal = ({
  onClose,
  children,
  header,
  fullHeight,
}: ModalProps) => {
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
      <CardStyled fullHeight={fullHeight}>
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

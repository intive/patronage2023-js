import * as ToastRUI from "@radix-ui/react-toast";
import { Dispatch, ReactNode, SetStateAction } from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

type ToastWrapper = {
  children: ReactNode;
};

type StyledToastProps = {
  variant: "confirm" | "error";
};

type ToastProps = {
  message: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
} & StyledToastProps;

const StyledViewport = styled(ToastRUI.Viewport)`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  width: 300px;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

const StyledRoot = styled(ToastRUI.Root)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 8px 8px 30px -11px rgba(30, 76, 64, 1);

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const StylingDiv = styled.div<StyledToastProps>`
  background-color: ${({ theme, variant }) => theme.toast[variant].background};
  color: ${({ theme, variant }) => theme.toast[variant].main};
  border: 2px solid ${({ theme, variant }) => theme.toast[variant].main};
`;

const StyledCloseButton = styled(ToastRUI.Close)`
  border: none;
  color: inherit;
  cursor: pointer;
`;

const StyledDescription = styled(ToastRUI.Description)`
  gap: 10px;
  display: flex;
  align-items: center;
`;

export const ToastWrapper = ({ children }: ToastWrapper) => {
  return (
    <ToastRUI.Provider
      duration={5000}
      label={"Notification window"}
      swipeDirection={"up"}
      swipeThreshold={30}>
      {children}
      <StyledViewport />
    </ToastRUI.Provider>
  );
};

export const Toast = ({ message, variant, open, onOpenChange }: ToastProps) => {
  return (
    <StyledRoot open={open} onOpenChange={onOpenChange} asChild>
      <StylingDiv variant={variant}>
        <StyledDescription>
          {variant === "confirm" ? (
            <Icon icon={"check"} size={20} />
          ) : (
            <Icon icon={"error"} size={20} />
          )}
          {message}
        </StyledDescription>
        <StyledCloseButton>
          <Icon icon="close" iconSize={20} />
        </StyledCloseButton>
      </StylingDiv>
    </StyledRoot>
  );
};

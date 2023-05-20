import * as ToastRUI from "@radix-ui/react-toast";
import styled from "styled-components";

export type ToastVariant = {
  variant: "confirm" | "error";
};

export const StyledViewport = styled(ToastRUI.Viewport)`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  width: 300px;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

export const StyledRoot = styled(ToastRUI.Root)`
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

export const StylingDiv = styled.div<ToastVariant>`
  background-color: ${({ theme, variant }) => theme.toast[variant].background};
  color: ${({ theme, variant }) => theme.toast[variant].main};
  border: 2px solid ${({ theme, variant }) => theme.toast[variant].main};
`;

export const StyledCloseButton = styled(ToastRUI.Close)`
  border: none;
  color: inherit;
  cursor: pointer;
`;

export const StyledDescription = styled(ToastRUI.Description)`
  gap: 10px;
  display: flex;
  align-items: center;
`;

export const ToastProvider = ToastRUI.Provider;

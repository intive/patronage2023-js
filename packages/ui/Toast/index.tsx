import * as ToastRUI from "@radix-ui/react-toast";
import { ReactNode } from "react";
import styled from "styled-components";

type ToastWrapper = {
  children: ReactNode;
};

const StyledViewport = styled(ToastRUI.Viewport)`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  width: 300px;
  list-style: none;
  z-index: 2147483647;
  outline: none;
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

export const Toast = () => {
  return (
    <ToastRUI.Root open={true}>
      <ToastRUI.Title>Title</ToastRUI.Title>
      <ToastRUI.Description>Description</ToastRUI.Description>
      <ToastRUI.Close>X</ToastRUI.Close>
    </ToastRUI.Root>
  );
};

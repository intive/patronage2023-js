"use client";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { ReactNode } from "react";

const colors = {
  Teal10: "#1E4C40",
};

const theme: DefaultTheme = {
  button: {
    primary: colors.Teal10,
  },
};

type WrapperProps = {
  children: ReactNode;
};

const StyledComponentsThemeWrapper = ({ children }: WrapperProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyledComponentsThemeWrapper;

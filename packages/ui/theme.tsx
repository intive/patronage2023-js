"use client";
import { ThemeProvider } from "styled-components";
import baseStyled, { ThemedStyledInterface } from "styled-components";
import { ReactNode } from "react";

const colors = {
  Teal10: "#1E4C40",
};

const theme = {
  button: {
    primary: colors.Teal10,
  },
};

type ThemeType = typeof theme;

type WrapperProps = {
  children: ReactNode;
};
const StyledComponentsThemeWrapper = ({ children }: WrapperProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const styled = baseStyled as ThemedStyledInterface<ThemeType>;
export default StyledComponentsThemeWrapper;

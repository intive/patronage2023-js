"use client";
import { ThemeProvider } from "styled-components";
import baseStyled, { ThemedStyledInterface } from "styled-components";
import { ReactNode } from "react";

const colors = {
  Teal10: "#1E4C40",
  Teal9: "#2E6858",
  Teal8: "#397B65",
  Teal7: "#459175",
  Teal6: "#52A785",
  Teal5: "#64BA95",
  Teal4: "#82D3AF",
  Teal3: "#A3EAC9",
  Teal2: "#D0F5E3",
  Teal1: "#F1FBF6",
  Neutral10: "#222222",
  Neutral9: "#3B3B3B",
  Neutral8: "#515151",
  Neutral7: "#626262",
  Neutral6: "#7E7E7E",
  Neutral5: "#9E9E9E",
  Neutral4: "#B1B1B1",
  Neutral3: "#CFCFCF",
  Neutral2: "#E1E1E1",
  Neutral1: "#F7F7F7",
  Supporting6: "#3F80BD",
  Supporting5: "#B96232",
  Supporting4: "#AB322C",
  Supporting3: "#DFEDFA",
  Supporting2: "#FCEFE7",
  Supporting1: "#FCEEED",
  BasicWhite: "#FFFFFF",
};

export const theme = {
  avatar: {
    outline: colors.BasicWhite,
  },
  background: {
    background: colors.Teal10,
  },
  button: {
    primary: {
      main: colors.Teal10,
      hover: colors.Teal7,
      disabled: colors.Teal4,
    },
    secondary: {
      main: colors.Teal10,
      background: colors.BasicWhite,
      hover: colors.Teal7,
      disabled: colors.Teal4,
    },
    simple: {
      main: colors.Teal6,
      background: colors.BasicWhite,
      disabled: colors.Teal4,
    },
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

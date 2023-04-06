"use client";
import { ThemeProvider } from "styled-components";
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
  BasicTransparent: "transparent",
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
      background: colors.BasicTransparent,
      hover: colors.Teal7,
      disabled: colors.Teal4,
    },
    simple: {
      main: colors.Teal6,
      background: colors.BasicTransparent,
      disabled: colors.Teal4,
    },
  },
  buttonGroup: {
    primary: {
      main: colors.BasicWhite,
      background: colors.Teal10,
      backgroundAction: colors.Teal7,
      notSelected: colors.Neutral4,
    },
    secondary: {
      main: colors.Teal10,
      border: colors.Neutral4,
      notSelected: colors.Neutral7,
    },
  },
  card: {
    background: colors.BasicWhite,
    border: colors.Neutral2,
  },
  chip: {
    completed: {
      main: colors.Teal9,
      background: colors.Teal2,
    },
    due: {
      main: colors.Supporting5,
      background: colors.Supporting2,
    },
    failed: {
      main: colors.Supporting4,
      background: colors.Supporting1,
    },
  },
  errorMessage: {
    main: colors.Supporting4,
    background: colors.Supporting1,
  },
  input: {
    main: colors.Teal8,
    error: colors.Supporting4,
    borderError: colors.Neutral2,
    neutral: colors.Neutral8,
    focus: colors.Teal5,
    labelBackground: colors.BasicWhite,
  },
  link: {
    main: colors.Teal8,
  },
  logo: {
    main: colors.Teal10,
  },
  separator: {
    withText: colors.Neutral5,
    withoutText: colors.Neutral2,
  },
  sideNavigationBarItem: {
    main: colors.Teal10,
    inactive: colors.Neutral6,
    background: colors.Teal7,
  },
  navList: {
    navItem: {
      activeColor: colors.Teal10,
      inactiveColor: colors.Neutral8,
      activeBackground: colors.Teal1,
      inactiveBackground: "transparent",
      hoverBackground: colors.Teal1,
    },
  },
};

export type ThemeType = typeof theme;

type WrapperProps = {
  children: ReactNode;
};
const StyledComponentsThemeWrapper = ({ children }: WrapperProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyledComponentsThemeWrapper;

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
  Supporting13: "#5A092F",
  Supporting12: "#FDE7F1",
  Supporting11: "#003150",
  Supporting10: "#E0F3FF",
  Supporting9: "#643400",
  Supporting8: "#FFF3E5",
  Supporting7: "#49AD1F",
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
  main: colors.Teal10,
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
      disabled: colors.Neutral3,
    },
    secondary: {
      main: colors.Teal10,
      background: colors.BasicTransparent,
      hover: colors.Teal7,
      disabled: colors.Neutral3,
    },
    simple: {
      main: colors.Teal6,
      background: colors.BasicTransparent,
      disabled: colors.Neutral3,
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
    reccuring: {
      main: colors.Supporting5,
      background: colors.Supporting2,
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
    neutralLabel: colors.Neutral10,
    focus: colors.Teal5,
    labelBackground: colors.BasicWhite,
    placeholder: colors.Neutral4,
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
  sideNavigationBar: {
    background: {
      activeColor: colors.BasicWhite,
      inactiveColor: "#e5e5e5",
    },
    sideNavigationBarItem: {
      main: colors.Teal10,
      inactive: colors.Neutral6,
      background: colors.Teal7,
    },
    subMenu: {
      separator: colors.Neutral2,
      title: colors.Teal10,
      background: colors.BasicWhite,
    },
  },
  nav: {
    main: colors.Teal10,
    avatarSelector: {
      active: colors.Teal6,
    },
  },
  navList: {
    navItem: {
      activeColor: colors.Teal10,
      inactiveColor: colors.Neutral8,
      activeBackground: colors.Teal1,
      inactiveBackground: colors.BasicTransparent,
      hoverAndFocusBackground: colors.Teal1,
      focusOutline: colors.Teal10,
    },
  },
  avatarSelector: {
    active: colors.Teal6,
  },
  checkbox: {
    main: colors.Teal6,
    inactive: colors.Neutral4,
  },
  primary: colors.Teal10,
  secondary: colors.Neutral8,
  datePicker: {
    basicWhite: colors.BasicWhite,
    neutral2: colors.Neutral2,
    neutral5: colors.Neutral5,
    neutral8: colors.Neutral8,
    neutral10: colors.Neutral10,
    teal1: colors.Teal1,
    teal2: colors.Teal2,
    teal3: colors.Teal3,
    teal4: colors.Teal4,
    teal6: colors.Teal6,
    teal8: colors.Teal8,
    teal10: colors.Teal10,
  },
  textarea: {
    font: colors.Neutral8,
    disabled: colors.Neutral2,
    focus: colors.Teal5,
    error: colors.Supporting4,
  },
  iconPicker: {
    main: colors.Teal10,
    background: colors.Neutral1,
    edit: colors.BasicWhite,
    hover: colors.Teal1,
    outline: colors.Teal5,
  },
  modal: {
    background: colors.Neutral8,
    header: colors.Teal10,
    closeButton: colors.Neutral6,
  },
  signUp: {
    main: colors.Teal10,
    text: colors.Neutral8,
    error: colors.Supporting4,
    icon: colors.BasicWhite,
    link: colors.BasicWhite,
    accent: colors.Neutral2,
  },
  transactionDropdownMenu: {
    outlineFocus: colors.Teal10,
    activeBackground: colors.Teal1,
    iconColor: colors.Neutral6,
  },
  infoTile: {
    border: colors.Neutral2,
    label: colors.Neutral6,
    value: colors.Neutral8,
  },
  currencySelect: {
    background: colors.BasicWhite,
    icon: colors.Neutral7,
    focusBackground: colors.Teal1,
    tag: colors.Neutral8,
    tagFocus: colors.Teal8,
  },
  budgetIcon: {
    main: colors.Teal10,
    background: colors.Neutral1,
  },
  currencyAmount: {
    positive: colors.Supporting7,
    text: colors.Neutral8,
  },
  createNewBudget: {
    background: colors.BasicWhite,
    inactive: colors.Neutral6,
    active: colors.Teal8,
    hover: colors.Teal10,
  },
  pagination: {
    hover: colors.Teal7,
    text: colors.Neutral6,
    active: colors.Teal6,
    border: colors.Neutral2,
  },
  transactionsTable: {
    background: colors.BasicWhite,
    headRowBottomBorder: colors.Neutral2,
    columnName: colors.Neutral8,
    date: colors.Neutral6,
    rowSeparator: colors.Neutral1,
    cellText: colors.Neutral10,
    sortIcon: colors.Neutral8,
  },
  categoryIcons: {
    homeSpendings: {
      foreground: colors.Teal10,
      background: colors.Teal1,
    },
    subscriptions: {
      foreground: colors.Supporting9,
      background: colors.Supporting8,
    },
    car: {
      foreground: colors.Supporting11,
      background: colors.Supporting10,
    },
    grocery: {
      foreground: colors.Supporting13,
      background: colors.Supporting12,
    },
  },
  formFooter: {
    text: "#3e4c59",
  },
  trendChip:{
    positiveValue: colors.Supporting7 ,
    negativeValue: colors.Supporting4
  }
};

export type ThemeType = typeof theme;

type WrapperProps = {
  children: ReactNode;
};
const StyledComponentsThemeWrapper = ({ children }: WrapperProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyledComponentsThemeWrapper;

"use client";
import { ThemeProvider } from "styled-components";
import { ReactNode } from "react";

export const colors = {
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
  Neutral12: "#cdcbcb",
  Neutral11: "#b1b1b11a",
  Neutral10: "#222222",
  Neutral9: "#3B3B3B",
  Neutral8: "#515151",
  Neutral7: "#626262",
  Neutral6: "#7E7E7E",
  Neutral5: "#9E9E9E",
  Neutral4: "#B1B1B1",
  Neutral3: "#CFCFCF",
  Neutral2: "#e1e1e1",
  Neutral1: "#F7F7F7",
  Supporting25: "#000000",
  Supporting24: "#FB8C00",
  Supporting23: "#8E24AA",
  Supporting22: "#B3443D",
  Supporting21: "#D1A11F",
  Supporting20: "#FFF7E0",
  Supporting19: "#368B4F",
  Supporting18: "#ECF7EE",
  Supporting17: "#E5707055",
  Supporting16: "#92CE7855",
  Supporting15: "#E57070",
  Supporting14: "#92CE78",
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
  black: colors.Supporting25,
  avatar: {
    outline: colors.BasicWhite,
    aggregator: colors.Neutral6,
  },
  tooltip: {
    backgroundColor: colors.BasicWhite,
    border: colors.Neutral2,
  },
  background: {
    background: colors.Teal10,
    loggedIn: colors.Neutral1,
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
    danger: {
      main: colors.Supporting4,
      hover: colors.Supporting4,
      disabled: colors.Supporting4,
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
      border: colors.Neutral2,
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
  toast: {
    confirm: { main: colors.Supporting19, background: colors.Supporting18 },
    error: { main: colors.Supporting4, background: colors.Supporting1 },
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
      inactiveColor: colors.Neutral1,
      mobile: colors.Teal1,
      separator: colors.Neutral2,
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
    burgerMenu: colors.BasicWhite,
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
      iconBackgroundColor: colors.BasicWhite,
    },
    infoText: colors.Neutral8,
    spinner: colors.Neutral5,
    error: colors.Supporting4,
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
    paragraph: colors.Neutral8,
  },
  signUp: {
    main: colors.Teal10,
    text: colors.Neutral8,
    error: colors.Supporting4,
    icon: colors.BasicWhite,
    link: colors.BasicWhite,
    accent: colors.Neutral2,
  },
  dropdownMenu: {
    outlineFocus: colors.Teal10,
    activeBackground: colors.Teal1,
    iconColor: colors.Neutral6,
    border: colors.Neutral2,
    contentBackground: colors.BasicWhite,
  },
  infoTile: {
    border: colors.Neutral2,
    label: colors.Neutral6,
    value: colors.Neutral8,
  },
  select: {
    background: colors.BasicWhite,
    icon: colors.Neutral7,
    focusBackground: colors.Teal1,
    border: colors.Neutral2,
    neutral: colors.Neutral8,
    error: colors.Supporting4,
    tag: colors.Neutral8,
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
  createNewTransaction: {
    paragraph: colors.Neutral8,
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
    sortIcon: { active: colors.Neutral8, inactive: colors.Neutral3 },
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
    salary: {
      foreground: colors.Teal10,
      background: colors.Teal3,
    },
    refund: {
      foreground: colors.Supporting21,
      background: colors.Supporting20,
    },
  },
  editIcon: {
    main: colors.Neutral6,
    background: colors.Neutral1,
  },
  formFooter: {
    text: "#3e4c59",
  },
  trendChip: {
    positiveValue: {
      color: colors.Supporting7,
      border: "rgba(73,173,31,0.5)",
    },
    negativeValue: {
      color: "#d41111",
      border: "rgba(212,17,17,0.5)",
    },
    zeroValue: {
      color: colors.Neutral6,
      border: colors.Neutral2,
    },
  },
  trendChart: {
    positiveLine: colors.Supporting14,
    negativeLine: colors.Supporting15,
    positiveFill: colors.Supporting16,
    negativeFill: colors.Supporting17,
    titleLeft: colors.Neutral6,
    currencyAmount: colors.Neutral8,
    placeholderBackground: colors.Neutral1,
    placeholderChartFill: colors.Neutral11,
    placeholderChartLine: colors.Neutral12,
  },
  budgetContent: {
    budgetDetails: colors.Neutral1,
    budgetStatistics: {
      border: colors.Neutral2,
      currency: colors.Neutral8,
      title: colors.Neutral6,
    },
  },
  asideCard: {
    title: colors.Neutral8,
  },
  favouriteBudget: {
    heartColor: "#ef4e4e",
  },
  importModal: {
    error: colors.Supporting22,
    HLCorrectData: colors.Supporting23,
    HLFirstLine: colors.Supporting24,
  },
  accordion: {
    main: colors.Teal10,
    borderInactive: colors.Neutral2,
    content: colors.Teal10,
    background: colors.BasicWhite,
  },
  personalCard: {
    main: colors.Teal10,
    background: colors.BasicWhite,
  },
  reports: {
    incomesBar: colors.Supporting7,
    incomesLine: colors.Supporting14,
    expensesBar: colors.Neutral2,
    expensesLine: colors.Neutral6,
    lineChartPointsFill: colors.Neutral1,
    buttonGroupSimpleLabel: colors.Neutral6,
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

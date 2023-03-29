import NextImage from "next/image";
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { ThemeProvider } from 'styled-components';
import {theme} from "ui/theme.tsx"

NextImage.defaultProps = {
  unoptimized: true,
};


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#fff",
      },
      {
        name: "darkgreen",
        value: "#1E4C40",
      },
    ],
  },
};
 export const decorators = [withThemeFromJSXProvider({
   themes: {
     default: theme,
   },
   defaultTheme: 'default',
   Provider: ThemeProvider
 })]
"use client";
/* eslint-disable @next/next/no-head-element */
import { StyledComponentsRegistry } from "../lib/registry";
import { Inter } from "@next/font/google";
import "./css/global.css";
import { LanguageProvider } from "lib/contexts";
import "./css/global.css";
import StyledComponentsThemeWrapper from "ui/theme";
import AppContext from "context/app";
import { useActions } from "actions/app";

export type LayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps) {
  // initialState
  const appState = useActions({
    isModalOpen: false,
    budget: 0,
  });

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Signika:wght@600&display=swap"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <LanguageProvider>
            <AppContext.Provider value={appState}>
              <StyledComponentsThemeWrapper>
                {children}
              </StyledComponentsThemeWrapper>
            </AppContext.Provider>
          </LanguageProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

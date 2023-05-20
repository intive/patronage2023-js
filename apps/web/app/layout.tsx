"use client";
/* eslint-disable @next/next/no-head-element */
import { StyledComponentsRegistry } from "../lib/registry";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledComponentsThemeWrapper from "ui/theme";
import SessionProviderWrapper from "./SessionProviderWrapper";
import "ka-table/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../css/global.css";

export type LayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Signika:wght@400;600&display=swap"
        />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProviderWrapper>
            <StyledComponentsRegistry>
              <StyledComponentsThemeWrapper>
                {children}
              </StyledComponentsThemeWrapper>
            </StyledComponentsRegistry>
          </SessionProviderWrapper>
        </QueryClientProvider>
      </body>
    </html>
  );
}

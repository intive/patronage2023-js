/* eslint-disable @next/next/no-head-element */
import { StyledComponentsRegistry } from "../lib/registry";
import { Open_Sans } from "next/font/google";
import Nav from "./Nav";

export type LayoutProps = {
  children: React.ReactNode;
};

const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head></head>
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <Nav />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

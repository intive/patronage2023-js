"use client";

import { Background } from "ui";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function SignInLayout({ children }: LayoutProps) {
  return <Background>{children}</Background>;
}

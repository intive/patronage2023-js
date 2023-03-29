"use client";
import type { Metadata } from "next";
import { AvatarSelector } from "ui";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function Web() {
  return <AvatarSelector />;
}

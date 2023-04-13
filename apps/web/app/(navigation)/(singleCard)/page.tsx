import type { Metadata } from "next";
import { MainPageTranslated } from "./MainPageTranslated";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function MainPage() {
  return <MainPageTranslated />;
}

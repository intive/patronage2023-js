import type { Metadata } from "next";
import Buttons from "./Buttons";
import Logotypes from "./Logotypes"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Buttons />
      <Logotypes />
    </div>
  );
}

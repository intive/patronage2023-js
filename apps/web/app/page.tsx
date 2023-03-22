import type { Metadata } from "next";
import Buttons from "./Buttons";
import ErrorDemo from "./ErrorDemo";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function Web() {
  return (
    <div>
      <h1>InBudget app</h1>
      <Buttons />
      <ErrorDemo />
    </div>
  );
}

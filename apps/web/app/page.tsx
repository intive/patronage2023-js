import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function Web() {
  return (
    <div>
      <p>hello from home</p>
    </div>
  );
}

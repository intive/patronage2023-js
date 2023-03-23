import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function Web() {
  return (
    <div>
      <p style={{ margin: "50px" }}>test page</p>
    </div>
  );
}

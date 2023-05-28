import type { Metadata } from "next";
import { SignUp } from "./FlowController/SignUp";

export const metadata: Metadata = {
  title: "Register",
};

export default function CreateAccountPage() {
  return <SignUp />;
}

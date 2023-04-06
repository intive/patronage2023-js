import type { Metadata } from "next";
import { CardWrapperStyled } from "./main-page-components";
import { CreateAccountPageCard } from "./CreateAccountPageCard";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function CreateAccountPage() {
  return (
    <CardWrapperStyled>
      <CreateAccountPageCard />
    </CardWrapperStyled>
  );
}

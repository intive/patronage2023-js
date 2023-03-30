import {CardWrapperStyled,CardStyled,LinkStyled} from "../(navigation)/main-page-components"
import { TypoStyled } from "./home/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function CreateAccountPage() {
    return (
        <CardWrapperStyled>
            <CardStyled>
                    <TypoStyled>Welcome to Inbudget</TypoStyled>
                    <LinkStyled href="/sign-in">Create my free account!</LinkStyled>
            </CardStyled>
        </CardWrapperStyled>
    )
}

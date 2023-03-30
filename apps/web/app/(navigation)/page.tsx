import {CardWrapperStyled,CardStyled,LinkStyled} from "../(navigation)/main-page-components"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function CreateAccountPage() {
    return (
        <CardWrapperStyled>
            <CardStyled>
                <LinkStyled href="/home">Create my free account!</LinkStyled>
            </CardStyled>
        </CardWrapperStyled>
    )
}

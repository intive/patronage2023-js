import { CardWrapperStyled, CardStyled } from "./page.styled";
import { WelcomeText } from "./WelcomeText";

export default function WelcomePage() {
  return (
    <CardWrapperStyled>
      <CardStyled>
        <WelcomeText />
      </CardStyled>
    </CardWrapperStyled>
  );
}

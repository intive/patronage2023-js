import { Accordion } from "ui";
import styled from "styled-components";
import { device } from "lib/media-queries";
import { useTranslate } from "lib/hooks";
import { CategoryFilter } from "components";

const StyledAccordion = styled(Accordion)`
  ${device.desktop} {
    display: none;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  border-width: 0;
  padding: 0;
  color: inherit;
  margin: 0 0 0 2em;
  cursor: pointer;
  font-weight: 600;
  font-size: large;
`;

const MobileFilter = () => {
  const { t, dict } = useTranslate("AsideCard");
  return (
    <>
      <CategoryFilter />
      <StyledButton onClick={() => console.log("Manage modal")}>
        ...{t(dict.categories.settings)}
      </StyledButton>
    </>
  );
};

export const MobileCategorySearch = () => {
  const { t, dict } = useTranslate("AsideCard");

  return (
    <StyledAccordion
      header={t(dict.categories.title)}
      content={<MobileFilter />}
    />
  );
};

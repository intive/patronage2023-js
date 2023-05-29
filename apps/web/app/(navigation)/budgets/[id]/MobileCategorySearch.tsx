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

export const MobileCategorySearch = () => {
  const { t, dict } = useTranslate("AsideCard");

  return (
    <StyledAccordion
      header={t(dict.categories.title)}
      content={<CategoryFilter />}
    />
  );
};

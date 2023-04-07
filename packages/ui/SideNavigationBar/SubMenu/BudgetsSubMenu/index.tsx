import styled from "styled-components";
import { Icon } from "../../../Icon";
import { IconProps } from "../../../Icon";
import { Button } from "../../../Button";
import { SearchInput } from "../../../Input/SearchInput";
import { SubMenuDataItemsProps } from "..";

type BudgetsSubMenuProps = {
  title: string;
  sort: {
    method: Function;
    icon: IconProps;
  };
  searchInput: {
    icon: IconProps;
    placeholder: string;
  };
  items: SubMenuDataItemsProps[];
};

export const BudgetsSubMenu = ({
  title,
  sort,
  searchInput,
  items,
}: BudgetsSubMenuProps) => {
  return (
    <>
      <MainDiv>
        <HeaderStyled>
          <Title>{title}</Title>
          <Icon icon="filter_list" />
        </HeaderStyled>
        <SearchInput searchInput={searchInput} />
        <ul>
          {items.map(({ icon, label, href }, index) => {
            return (
              <ListElementStyled key={`BudgetsListElement-${index}`}>
                <Icon icon={icon} />
                <span>{label}</span>
              </ListElementStyled>
            );
          })}
        </ul>
      </MainDiv>

      <Button
        variant="secondary"
        onClick={() =>
          console.log("New budget creation modal has been opened! ")
        }>
        Create a new budget
      </Button>
    </>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-family: "Signika";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ListElementStyled = styled.li`
  list-style: none;
  padding: 0;
`;

import styled from "styled-components";
import { ReactNode } from "react";
import { useState } from "react";
import { SearchInput } from "../../Input/SearchInput";
import { Button } from "../../Button";

export type SubMenuDataProps = {
  title: string;
  sort?: {
    clickHandler: () => void;
    icon: ReactNode;
  };
  searchInput?: {
    placeholder: string;
  };
  navigationList?: ReactNode;
  button?: {
    clickHandler: () => void;
    label: string;
  };
};

type SubMenuProps = {
  subMenuDataObject: SubMenuDataProps;
} & React.HTMLProps<HTMLDivElement>;

const SubMenuStyled = styled.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 40px 16px 24px 16px;

  border-left: 1px solid
    ${({ theme }) => theme.sideNavigationBar.subMenu.separator};
`;

export const SubMenu = ({ subMenuDataObject: subMenuData }: SubMenuProps) => {
  const { title, sort, searchInput, navigationList, button } = subMenuData;

  const [value, setValue] = useState("");
  return (
    <SubMenuStyled>
      <MainDiv>
        <HeaderStyled>
          <Title>{title}</Title>
          {sort?.icon}
        </HeaderStyled>
        {searchInput && (
          <SearchInput
            name="searchInput"
            type="text"
            placeholder={searchInput.placeholder}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onInputCleared={() => setValue("")}
          />
        )}
        {navigationList}
      </MainDiv>

      {button && (
        <Button variant="secondary" onClick={() => button.clickHandler()}>
          {button.label}
        </Button>
      )}
    </SubMenuStyled>
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
  color: ${({ theme }) => theme.sideNavigationBar.subMenu.title};
  line-height: 36px;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

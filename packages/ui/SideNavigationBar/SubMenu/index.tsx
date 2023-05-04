import styled from "styled-components";
import { ReactNode } from "react";
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
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInputCleared?: () => void;
    value?: string;
  };
  navigationList?: ReactNode;
  button?: {
    clickHandler: () => void;
    label: string;
  };
};

type SubMenuProps = {
  subMenuDataObject: SubMenuDataProps;
  onInputChangeUpdateSubMenuData: (title: string) => void;
} & React.HTMLProps<HTMLDivElement>;

const SubMenuStyled = styled.div`
  position: absolute;
  top: 0;
  left: 80px;
  height: 100%;
  width: 288px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;

  padding: 40px 16px 24px 16px;
  border-left: 1px solid
    ${({ theme }) => theme.sideNavigationBar.subMenu.separator};
  background-color: ${({ theme }) =>
    theme.sideNavigationBar.subMenu.background};
  box-shadow: 3px 0 10px lightgray;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

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

export const SubMenu = ({
  subMenuDataObject: subMenuData,
  onInputChangeUpdateSubMenuData,
}: SubMenuProps) => {
  const { title, sort, searchInput, navigationList, button } = subMenuData;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchInput?.onChange?.(e);
    onInputChangeUpdateSubMenuData(title);
  };

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
            value={searchInput.value}
            onChange={onInputChange}
            onInputCleared={searchInput.onInputCleared}
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

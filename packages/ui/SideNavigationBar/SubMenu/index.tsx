import styled from "styled-components";
import { ReactNode } from "react";
import { SearchInput } from "../../Input/SearchInput";
import { Button } from "../../Button";
import { Avatar } from "../../Avatar";

export type SubMenuDataItemsProps = {
  icon?: ReactNode;
  label?: string;
  href?: string;
  avatarSrc?: string;
  username?: string;
  id: string;
};

export type SubMenuDataProps = {
  title: string;
  sort?: {
    method: () => void;
    icon: ReactNode;
  };
  searchInput?: {
    placeholder: string;
    icon: ReactNode;
  };
  items: SubMenuDataItemsProps[];
  button?: {
    method: () => void;
    label: string;
  };
};

type SubMenuProps = {
  subMenuDataObject: SubMenuDataProps;
} & React.HTMLProps<HTMLDivElement>;

const SubMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 40px 16px 24px 16px;
  box-shadow: 10px 10px;

  border-left: 1px solid lightgray;
`;

export const SubMenu = ({ subMenuDataObject: subMenuData }: SubMenuProps) => {
  return (
    <SubMenuStyled>
      <MainDiv>
        <HeaderStyled>
          <Title>{subMenuData.title}</Title>
          {subMenuData.sort?.icon}
        </HeaderStyled>
        {subMenuData.searchInput && (
          <SearchInput searchInput={subMenuData.searchInput} />
        )}
        <ul>
          {subMenuData.items.map(
            ({ icon, label, href, avatarSrc, username, id }, index) => {
              return (
                <ListElementStyled key={id}>
                  {avatarSrc ? (
                    <>
                      <Avatar username={username} src={avatarSrc} />
                      <span>{username}</span>
                    </>
                  ) : (
                    <>
                      {icon}
                      <span>{label}</span>
                    </>
                  )}
                </ListElementStyled>
              );
            }
          )}
        </ul>
      </MainDiv>

      {subMenuData.button && (
        <Button
          variant="secondary"
          onClick={() => console.log("Modal has been opened! ")}>
          {subMenuData.button.label}
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

import styled from "styled-components";
import { Icon } from "../../../Icon";
import { IconProps } from "../../../Icon";
import { Avatar } from "../../../Avatar";
import { Button } from "../../../Button";
import { SearchInput } from "../../../Input/SearchInput";

type TeamSubMenuDataItemsProps = {
  avatarSrc: string;
  username: string;
};

type TeamSubMenuProps = {
  title: string;
  sort: {
    method: Function;
    icon: IconProps;
  };
  searchInput: {
    icon: IconProps;
    placeholder: string;
  };
  items: TeamSubMenuDataItemsProps[];
};

export const TeamSubMenu = ({
  title,
  sort,
  searchInput,
  items,
}: TeamSubMenuProps) => {
  return (
    <>
      <MainDiv>
        <HeaderStyled>
          <Title>{title}</Title>
          <Icon icon="filter_list" />
        </HeaderStyled>
        <SearchInput searchInput={searchInput} />
        <ul>
          {items.map(({ avatarSrc, username }, index) => {
            return (
              <ListElementStyled key={`TeamsListItem-${index}`}>
                <Avatar username={username} src={avatarSrc} />
                <span>{username}</span>
              </ListElementStyled>
            );
          })}
        </ul>
      </MainDiv>

      <Button
        variant="secondary"
        onClick={() => console.log("New member has been added! ")}>
        Add new member
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

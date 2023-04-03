import styled from "styled-components";
import { Icon } from "../../../Icon";
import { Avatar } from "../../../Avatar";
import { Button } from "../../../Button";
import { SearchInput } from "../../../Input/SearchInput";

export const TeamSubMenu = ({
  title,
  sort,
  searchInput,
  items,
}: BudgetsSubMenuProps) => {
  return (
    <>
      <MainDiv>
        <HeaderStyled>
          <h3>{title}</h3>
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

type BudgetsSubMenuProps = {
  title: string;
  sort: object;
  searchInput: any;
  items: [];
};

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

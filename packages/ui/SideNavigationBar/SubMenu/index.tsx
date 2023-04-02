import styled from "styled-components";
import { Icon } from "../../Icon";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { BudgetsSubMenu } from "./BudgetsSubMenu";
import { TeamSubMenu } from "./TeamSubMenu";
import { SettingsSubMenu } from "./SettingsSubMenu";

type SubMenuProps = {
  dataObject: object;
} & React.HTMLProps<HTMLDivElement>;

const SubMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 10px 20px;
  box-shadow: 10px 10px;
`;

export const SubMenu = ({ dataObject }: SubMenuProps) => {
  return (
    <SubMenuStyled>
      {dataObject.title === "Budgets" ? (
        <BudgetsSubMenu
          title={dataObject.title}
          sort={dataObject.sort}
          searchInput={dataObject.searchInput}
          items={dataObject.items}
        />
      ) : dataObject.title === "Team" ? (
        <TeamSubMenu
          title={dataObject.title}
          sort={dataObject.sort}
          searchInput={dataObject.searchInput}
          items={dataObject.items}
        />
      ) : dataObject.title === "Settings" ? (
        <SettingsSubMenu title={dataObject.title} items={dataObject.items} />
      ) : (
        ""
      )}
    </SubMenuStyled>
  );
};

import styled from "styled-components";
import { Icon } from "ui";
import { IconType } from "ui/Icon/index";

type categoryType = {
  id: number;
  name: string;
  icon: {
    name: string;
    foreground: string;
    background: string;
  };
};

type IncomeExpenseIconProps = {
  category: categoryType;
};

type BackgroundProps = {
  background: string;
};

const IconBackground = styled.div<BackgroundProps>`
  font-size: 1em;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ background }) => background || "lightgrey"};
`;

export const IncomeExpenseIcon = ({ category }: IncomeExpenseIconProps) => {
  const { icon } = category;
  const { name, foreground, background } = icon;

  return (
    <IconBackground background={background}>
      <Icon
        icon={(name as IconType) || "help"}
        color={foreground || "black"}
        iconSize={24}
      />
    </IconBackground>
  );
};

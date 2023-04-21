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
  font-size: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ background }) => background || "grey"};
`;

export const IncomeExpenseIcon = ({ category }: IncomeExpenseIconProps) => {
  const { icon } = category;
  const { name, foreground, background } = icon;

  return (
    <IconBackground background={background}>
      <Icon icon={name as IconType} color={foreground} />
    </IconBackground>
  );
};

// <div>
//   <p>id: {category.id}</p>
//   <p>name: {category.name}</p>
//   <p>icon name: {category.icon.name}</p>
//   <p>icon foreground: {category.icon.foreground}</p>
//   <p>icon background: {category.icon.background}</p>
// </div>.

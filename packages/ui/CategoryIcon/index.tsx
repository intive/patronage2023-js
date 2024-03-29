import styled from "styled-components";
import { Icon, IconType } from "ui";

export type CategoryType = {
  categoryId: string;
  name: string;
  icon: {
    iconName: string;
    foreground: string;
    background: string;
  };
};

export type CategoryIconProps = {
  category: CategoryType;
  small?: boolean;
  className?: string;
};

type BackgroundProps = {
  backgroundColor: string;
  small?: boolean;
};

const IconBackground = styled.div<BackgroundProps>`
  width: ${({ small }) => (small ? "2.286em" : "2.5em")};
  height: ${({ small }) => (small ? "2.286em" : "2.5em")};
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor || "#E1E1E1"};
`;

export const CategoryIcon = ({
  category,
  small,
  className,
}: CategoryIconProps) => {
  const { icon } = category;
  const { iconName: name, foreground, background } = icon;

  return (
    <IconBackground
      className={className}
      backgroundColor={background}
      small={small}>
      <Icon
        icon={(name as IconType) || "help"}
        color={foreground || "black"}
        iconSize={24}
      />
    </IconBackground>
  );
};

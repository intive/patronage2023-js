"use client";
import { ReactNode, useState } from "react";
import {
  IconPickerStyled,
  IconAndButtonWrapperStyled,
  IconsSelectorStyled,
  EditButtonStyled,
  SelectIconButtonStyled,
} from "./iconPicker.styled";
import { Icon, IconType } from "../Icon";

type IconPickerProps = {
  defaultIcon?: IconType;
  icons: IconType[];
  onSelect: (icon: IconType) => void;
  children?: ReactNode;
};

type IconSelectorButtonProps = {
  icon: IconType;
  onClick: () => void;
};

export const IconSelectorButton = ({
  icon,
  onClick,
}: IconSelectorButtonProps) => {
  return (
    <SelectIconButtonStyled key={icon} onClick={onClick}>
      <Icon icon={icon} iconSize={30} />
    </SelectIconButtonStyled>
  );
};

export const IconPicker = ({
  defaultIcon,
  icons,
  onSelect,
  children,
}: IconPickerProps) => {
  const [currentIcon, setCurrentIcon] = useState(defaultIcon);
  console.log("ustawino current z usestate");
  const [iconSelectorVisible, setIconSelectorVisible] = useState(false);

  const handleEditButtonClick = () => {
    setIconSelectorVisible(!iconSelectorVisible);
  };

  const handleIconSelectorButtonClick = (icon: IconType) => {
    setIconSelectorVisible(false);
    setCurrentIcon(icon);
    console.log("ustawiono current z buttona");
    onSelect(icon);
    console.log("ustawiono select z buttona");
  };

  return (
    <IconPickerStyled>
      <IconAndButtonWrapperStyled>
        {currentIcon ? (
          <Icon icon={currentIcon} iconSize={40} />
        ) : (
          <>{children}</>
        )}
        <EditButtonStyled onClick={handleEditButtonClick}>
          <Icon icon="edit" iconSize={12} />
        </EditButtonStyled>
      </IconAndButtonWrapperStyled>
      {iconSelectorVisible && (
        <IconsSelectorStyled>
          {icons.map((icon) => (
            <IconSelectorButton
              key={icon}
              icon={icon}
              onClick={() => handleIconSelectorButtonClick(icon)}
            />
          ))}
        </IconsSelectorStyled>
      )}
    </IconPickerStyled>
  );
};

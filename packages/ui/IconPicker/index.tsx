"use client";
import { useState } from "react";
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
}: IconPickerProps) => {
  const [currentIcon, setCurrentIcon] = useState(defaultIcon);
  const [iconSelectorVisible, setIconSelectorVisible] = useState(false);

  const handleEditButtonClick = () => {
    setIconSelectorVisible(!iconSelectorVisible);
  };

  const handleIconSelectorButtonClick = (icon: IconType) => {
    setIconSelectorVisible(false);
    setCurrentIcon(icon);
    onSelect(icon);
  };

  return (
    <IconPickerStyled>
      <IconAndButtonWrapperStyled>
        {currentIcon && <Icon icon={currentIcon} iconSize={40} />}
        <EditButtonStyled onClick={handleEditButtonClick}>
          <Icon icon="edit" iconSize={12} />
        </EditButtonStyled>
      </IconAndButtonWrapperStyled>
      {iconSelectorVisible && (
        <IconsSelectorStyled>
          {icons.map((icon, index) => (
            <IconSelectorButton
              key={`${index}-icon-selector-button`}
              icon={icon}
              onClick={() => handleIconSelectorButtonClick(icon)}
            />
          ))}
        </IconsSelectorStyled>
      )}
    </IconPickerStyled>
  );
};

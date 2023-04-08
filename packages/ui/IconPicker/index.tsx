"use client";
import { ReactNode, useEffect, useState } from "react";
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

type IconSelectorProps = {
  icons: IconType[];
  onClose: () => void;
  onSelect: (icon: IconType) => void;
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

export const IconSelector = ({
  icons,
  onClose,
  onSelect,
}: IconSelectorProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <IconsSelectorStyled>
      {icons.map((icon) => (
        <IconSelectorButton
          key={icon}
          icon={icon}
          onClick={() => onSelect(icon)}
        />
      ))}
    </IconsSelectorStyled>
  );
};

export const IconPicker = ({
  defaultIcon,
  icons,
  onSelect,
  children,
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

  const handleCloseIconSelector = () => setIconSelectorVisible(false);

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
        <IconSelector
          icons={icons}
          onClose={handleCloseIconSelector}
          onSelect={(icon) => handleIconSelectorButtonClick(icon)}
        />
      )}
    </IconPickerStyled>
  );
};

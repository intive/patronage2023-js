"use client";
import { ReactNode, useEffect, useState, useRef } from "react";
import {
  IconPickerStyled,
  IconsSelectorStyled,
  EditButtonStyled,
  SelectIconButtonStyled,
} from "./iconPicker.styled";
import { BudgetIcon } from "../BudgetIcon";
import { Icon, IconType } from "../Icon";
import { useOnClickOutside } from "./useOnclickOutside";

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
  }, [onClose]);

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

  const ref = useRef(null);
  useOnClickOutside(ref, () => setIconSelectorVisible(false));

  const handleEditButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIconSelectorVisible(!iconSelectorVisible);
  };

  const handleIconSelectorButtonClick = (icon: IconType) => {
    setIconSelectorVisible(false);
    setCurrentIcon(icon);
    onSelect(icon);
  };

  const handleCloseIconSelector = () => setIconSelectorVisible(false);

  return (
    <IconPickerStyled ref={ref} onClick={handleEditButtonClick}>
      {currentIcon ? (
        <BudgetIcon icon={currentIcon} />
      ) : (
        <BudgetIcon>{children}</BudgetIcon>
      )}
      <EditButtonStyled onClick={handleEditButtonClick}>
        <Icon icon="edit" iconSize={12} />
      </EditButtonStyled>
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

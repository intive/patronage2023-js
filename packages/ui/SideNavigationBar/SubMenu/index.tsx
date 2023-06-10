import { ReactNode } from "react";
import { SearchInput } from "../../Input/SearchInput";
import { ButtonStyled } from "../../Button";
import { Icon } from "../../Icon";
import { ExportDropdown } from "../../ExportDropdown";
import {
  IconUpsideDown,
  LinkStyled,
  SubMenuStyled,
  MainDiv,
  SubMenuHeaderStyled,
  HeaderStyled,
  IconWrapperStyled,
  ButtonGroupStyled,
  ImportExportButtonStyled,
  NewBudgetButtonStyled,
  Title,
  ExportBudgetsByMailStyled,
} from "./SubMenu.styled";
import { Tooltip } from "../../Tooltip";

type SubMenuButtonType = {
  clickHandler: () => void;
  label: string;
  csvUri?: string;
};

export type SubMenuDataProps = {
  title: string;
  sort?: {
    clickHandler: () => void;
    icon: string;
    sortAscending: boolean;
  };
  searchInput?: {
    placeholder: string;
    onChange?: (value: string) => void;
    onInputCleared?: () => void;
    value?: string;
  };
  navigationList?: ReactNode;
  button?: SubMenuButtonType;
  exportButton?: SubMenuButtonType;
  importButton?: SubMenuButtonType;
  exportBudgetsByMailButton?: SubMenuButtonType;
};

type SubMenuProps = {
  subMenuDataObject: SubMenuDataProps;
} & React.HTMLProps<HTMLDivElement>;

export const SubMenu = ({ subMenuDataObject: subMenuData }: SubMenuProps) => {
  const {
    title,
    sort,
    searchInput,
    navigationList,
    button,
    exportButton,
    importButton,
    exportBudgetsByMailButton,
  } = subMenuData;

  const onInputChange = (value: string) => {
    searchInput?.onChange?.(value);
  };

  const onIconClicked = () => {
    sort?.clickHandler();
  };

  const sortIcon = sort?.sortAscending ? (
    <Icon icon="filter_list" />
  ) : (
    <IconUpsideDown icon="filter_list" />
  );

  const triggerButton = (
    <ButtonStyled
      as={ImportExportButtonStyled}
      disabled={!!!exportButton?.csvUri}
      variant="secondary">
      <Icon icon="file_upload" size={12} />
    </ButtonStyled>
  );

  const downloadLink = (
    <LinkStyled
      href={exportButton?.csvUri}
      download
      title="csv"
      onClick={exportButton?.clickHandler}>
      <Icon icon="file_upload" size={12} />
      <span>{exportButton?.label}</span>
    </LinkStyled>
  );

  const emailButton = (
    <ExportBudgetsByMailStyled
      onClick={exportBudgetsByMailButton?.clickHandler}
      title="email"
      variant="simple">
      <Icon icon="file_upload" size={12} />
      <span>{exportBudgetsByMailButton?.label}</span>
    </ExportBudgetsByMailStyled>
  );

  const exportBudgetsDropdownItems = [
    {
      id: "export-budgets-download",
      node: downloadLink,
    },
    {
      id: "export-budgets-email",
      node: emailButton,
    },
  ];

  return (
    <SubMenuStyled>
      <MainDiv>
        <SubMenuHeaderStyled>
          <HeaderStyled>
            <Title>{title}</Title>
            <IconWrapperStyled onClick={onIconClicked}>
              {sort?.icon && sortIcon}
            </IconWrapperStyled>
          </HeaderStyled>
          {exportButton && importButton && (
            <ButtonGroupStyled>
              {button && (
                <NewBudgetButtonStyled
                  reduceFontSize={button.label.length > 12}
                  variant="secondary"
                  onClick={() => button.clickHandler()}
                  fullWidth>
                  <Icon icon="add" size={12} />
                  {button.label}
                </NewBudgetButtonStyled>
              )}
              <ExportDropdown
                isButtonDisabled={!!!exportButton?.csvUri}
                triggerButton={triggerButton}
                items={exportBudgetsDropdownItems}
                tooltipLabel={exportButton.label}
              />
              <Tooltip text={`${importButton.label}`} position="bottom">
                <ButtonStyled
                  as={ImportExportButtonStyled}
                  variant="secondary"
                  onClick={importButton.clickHandler}>
                  <Icon icon="file_download" size={12} />
                </ButtonStyled>
              </Tooltip>
            </ButtonGroupStyled>
          )}
          {searchInput && (
            <SearchInput
              name="searchInput"
              type="text"
              placeholder={searchInput.placeholder}
              value={searchInput.value}
              onChange={(e) => onInputChange(e.currentTarget.value)}
              onInputCleared={searchInput.onInputCleared}
            />
          )}
        </SubMenuHeaderStyled>
        {navigationList}
      </MainDiv>
    </SubMenuStyled>
  );
};

import { ReactNode } from "react";
import { SearchInput } from "../../Input/SearchInput";
import { ButtonStyled } from "../../Button";
import { Icon } from "../../Icon";
import { ExportDropdown } from "../../ExportDropdown";
import {
  IconUpsideDown,
  StyledButton,
  LinkStyled,
  SubMenuStyled,
  MainDiv,
  SubMenuHeaderStyled,
  HeaderStyled,
  IconWrapperStyled,
  ButtonGroupStyled,
  ImportButton,
  NewBudgetButtonStyled,
  Title,
} from "./SubMenu.styled";

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

  // For some reason, radix doesn't work with our Button from UI (doesn't like onClick)
  // So I use polymorphism to get the styles from our Button and pass them to <button>
  const triggerButton = (
    <ButtonStyled
      as={StyledButton}
      disabled={!!!exportButton?.csvUri}
      variant="secondary">
      <Icon icon="file_download" size={12} />
      {exportButton?.label}
    </ButtonStyled>
  );

  const downloadLink = (
    <LinkStyled href={exportButton?.csvUri} download title="csv">
      <Icon icon="file_download" size={12} />
      <span>{exportButton?.label}</span>
    </LinkStyled>
  );

  const emailButton = (
    <button
      onClick={() => {
        console.log("email");
      }}>
      email
    </button>
  );

  const exportBudgetsItems = [
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
              <ExportDropdown
                isButtonDisabled={!!!exportButton?.csvUri}
                triggerButton={triggerButton}
                items={exportBudgetsItems}
              />
              <ImportButton
                variant="secondary"
                onClick={importButton.clickHandler}>
                <Icon icon="file_upload" size={12} />
                <span> {importButton.label}</span>
              </ImportButton>
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

      {button && (
        <NewBudgetButtonStyled
          variant="secondary"
          onClick={() => button.clickHandler()}>
          {button.label}
        </NewBudgetButtonStyled>
      )}
    </SubMenuStyled>
  );
};

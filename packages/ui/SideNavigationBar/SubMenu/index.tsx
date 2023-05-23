import styled from "styled-components";
import { ReactNode, useEffect } from "react";
import { SearchInput } from "../../Input/SearchInput";
import { Button } from "../../Button";
import { ButtonStyled } from "../../Button";
import { Icon } from "../../Icon";

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
  button?: {
    clickHandler: () => void;
    label: string;
  };
  exportButton?: {
    clickHandler: () => void;
    label: string;
  };
  importButton?: {
    clickHandler: () => void;
    label: string;
  };
};

type SubMenuProps = {
  subMenuDataObject: SubMenuDataProps;
} & React.HTMLProps<HTMLDivElement>;

const SubMenuStyled = styled.div`
  position: fixed;
  top: 0;
  left: 80px;
  height: 100%;
  width: 288px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  margin-top: 68px;
  padding: 40px 4px 24px 16px;
  border-left: 1px solid
    ${({ theme }) => theme.sideNavigationBar.subMenu.separator};
  background-color: ${({ theme }) =>
    theme.sideNavigationBar.subMenu.background};
  box-shadow: 0px 6px 20px -2px rgba(26, 26, 26, 0.14);
`;

const SubMenuHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 12px; // + padding above = 16 to handle scroll
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-family: "Signika";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.sideNavigationBar.subMenu.title};
  line-height: 36px;
`;

const ButtonStyledS = styled(Button)`
  width: 256px;
  position: fixed;
  bottom: 25px;
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
`;

// const CsvButtonStyled = styled(ButtonStyled)`
//   font-size: 0.875em;
//   padding: 6px;
//   line-height: 1.25em;
// `;

const ButtonContentStyled = styled.div`
  display: flex;
  justify-items: flex-start;
  align-items: center;
  gap: 4px;
`;

const IconUpsideDown = styled(Icon)`
  transform: rotate(180deg);
  cursor: pointer;
`;

const IconWrapperStyled = styled.div`
  cursor: pointer;
`;

const InputLabelStyled = styled.label`
  font-size: 0.875em;
  padding: 6px;
  line-height: 1.25em;
  input[type="file"] {
    display: none;
  }
  cursor: pointer;
`;

const LinkStyled = styled.a`
  font-size: 0.875em;
  padding: 6px;
  line-height: 1.25em;
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.main};
  cursor: pointer;
`;

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

  useEffect(() => {
    return () => searchInput?.onChange?.("");
  }, [searchInput]);

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
          <ButtonGroupStyled>
            <ButtonStyled
              variant="secondary"
              onClick={() => exportButton?.clickHandler()}
              as={InputLabelStyled}
              htmlFor="export-input">
              <ButtonContentStyled>
                <input
                  type="file"
                  id="export-input"
                  name="export-csv"
                  accept=".csv"
                  onChange={(e) => {
                    //e.target.value = '';
                    console.log("run func to submit and export file");
                  }}
                />
                <Icon icon="file_download" size={12} />
                <span>{exportButton?.label}</span>
              </ButtonContentStyled>
            </ButtonStyled>
            <ButtonStyled
              variant="secondary"
              onClick={() => importButton?.clickHandler()}
              as={LinkStyled}
              href="/avatars/3.svg"
              download
              title="csvv">
              <ButtonContentStyled>
                <Icon icon="file_upload" size={12} />
                <span> {importButton?.label}</span>
              </ButtonContentStyled>
            </ButtonStyled>
          </ButtonGroupStyled>
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
        <ButtonStyledS
          variant="secondary"
          onClick={() => button.clickHandler()}>
          {button.label}
        </ButtonStyledS>
      )}
    </SubMenuStyled>
  );
};

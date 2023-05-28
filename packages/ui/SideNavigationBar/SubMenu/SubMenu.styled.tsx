import styled, { css } from "styled-components";
import { Button } from "../../Button";
import { Icon } from "../../Icon";

export const SubMenuStyled = styled.div`
  position: fixed;
  top: 0;
  left: 94px;
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

export const SubMenuHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 12px; // + padding above = 16 to handle scroll
`;

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`;

export const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-family: "Signika";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.sideNavigationBar.subMenu.title};
  line-height: 36px;
`;

export const NewBudgetButtonStyled = styled(Button)`
  width: 256px;
  position: fixed;
  bottom: 25px;
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
`;

export const IconUpsideDown = styled(Icon)`
  transform: rotate(180deg);
  cursor: pointer;
`;

export const IconWrapperStyled = styled.div`
  cursor: pointer;
`;

export const ImportExportButtonsStyle = css`
  display: flex;
  justify-items: flex-start;
  align-items: center;
  gap: 4px;
  font-size: 0.875em;
  padding: 6px;
  line-height: 1.25em;
  outline: 0;
  color: ${({ theme }) => theme.main};
  cursor: pointer;
`;

export const ImportButton = styled(Button)`
  ${ImportExportButtonsStyle};
`;

export const StyledButton = styled.button`
  ${ImportExportButtonsStyle}
`;

export const LinkStyled = styled.a`
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.main};
  gap: 4px;
`;

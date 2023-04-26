import styled, { css } from "styled-components";
import { ReactNode } from "react";

type SideNavigationBarButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  textValue: string;
  activeFlag: boolean;
} & React.HTMLProps<HTMLButtonElement>;

type WrapperProps = {
  activeFlag: boolean;
} & React.HTMLProps<HTMLDivElement>;

type SpanProps = {
  fontSize: number;
} & React.HTMLProps<HTMLSpanElement>;

const ListItemStyled = styled.li`
  list-style: none;
`;

const ButtonStyled = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.button.simple.background};
`;

const Wrapper = styled.div<WrapperProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
  height: auto;
  padding: 17px 0px 17px 0px;
  color: ${({ activeFlag, theme }) =>
    activeFlag
      ? theme.sideNavigationBar.sideNavigationBarItem.main
      : theme.sideNavigationBar.sideNavigationBarItem.inactive};
`;

const SpanStyled = styled.span<SpanProps>`
  font-weight: 600;
  text-align: center;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `};
  padding: 0 20px 0 20px;
`;

const DivStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) =>
    theme.sideNavigationBar.sideNavigationBarItem.background};
  height: 100%;
  width: 4px;
  border-radius: 0 8px 8px 0;
`;

export const SideNavigationBarButton = ({
  onClick,
  icon,
  textValue,
  activeFlag,
}: SideNavigationBarButtonProps) => {
  return (
    <ListItemStyled>
      <ButtonStyled onClick={onClick}>
        <Wrapper activeFlag={activeFlag}>
          {icon}
          <SpanStyled fontSize={10}>{textValue}</SpanStyled>
          {activeFlag && <DivStyled />}
        </Wrapper>
      </ButtonStyled>
    </ListItemStyled>
  );
};

import styled, { css } from "styled-components";
import { ReactNode } from "react";

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

type SideNavigationBarButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  textValue: string;
  activeFlag: boolean;
} & React.HTMLProps<HTMLButtonElement>;

type SpanProps = {
  fontSize: number;
} & React.HTMLProps<HTMLSpanElement>;

type WrapperProps = {
  activeFlag: boolean;
} & React.HTMLProps<HTMLDivElement>;

const ListItemStyled = styled.li`
  list-style: none;
  padding: 0;
`;

const ButtonStyled = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const Wrapper = styled.div<WrapperProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  position: relative;
  height: auto;
  width: 60px;

  padding: 17px 34px 17px 34px;
  color: ${({ activeFlag, theme }) =>
    activeFlag
      ? theme.sideNavigationBarItem.main
      : theme.sideNavigationBarItem.inactive};
`;

const SpanStyled = styled.span<SpanProps>`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  text-align: center;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `};
`;

const DivStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.sideNavigationBarItem.background};
  height: 100%;
  width: 4px;
  border-radius: 0 8px 8px 0;
`;

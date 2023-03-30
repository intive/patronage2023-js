"use client";

import { css } from "styled-components";
import { styled } from "ui/theme";

export const logoVersions = {
  colorURL:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAyOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTEuNTgwNkMwIDEwLjI2ODQgMC44NTI3NDkgOS4xMDg1MiAyLjEwNTE4IDguNzE3MTNMMjQuMTA1MiAxLjg0MjEzQzI2LjAzNyAxLjIzODQ1IDI4IDIuNjgxNjUgMjggNC43MDU1N1YxOS40MTk0QzI4IDIwLjczMTYgMjcuMTQ3MyAyMS44OTE1IDI1Ljg5NDggMjIuMjgyOUwzLjg5NDgzIDI5LjE1NzlDMS45NjMwNCAyOS43NjE2IDAgMjguMzE4MyAwIDI2LjI5NDRWMTEuNTgwNloiIGZpbGw9IiM1M0E3ODUiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMCAxMS43MDU2QzAgOS42ODE2NSAxLjk2MzAzIDguMjM4NDUgMy44OTQ4MiA4Ljg0MjEzTDI1Ljg5NDggMTUuNzE3MUMyNy4xNDczIDE2LjEwODUgMjggMTcuMjY4NCAyOCAxOC41ODA2VjMzLjI5NDRDMjggMzUuMzE4MyAyNi4wMzcgMzYuNzYxNiAyNC4xMDUyIDM2LjE1NzlMMi4xMDUxOCAyOS4yODI5QzAuODUyNzQ5IDI4Ljg5MTUgMCAyNy43MzE2IDAgMjYuNDE5NFYxMS43MDU2WiIgZmlsbD0iIzgyRDNBRiIvPgo8L3N2Zz4K",
  whiteURL:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAyOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTEuNTgwNkMwIDEwLjI2ODQgMC44NTI3NDkgOS4xMDg1MiAyLjEwNTE4IDguNzE3MTNMMjQuMTA1MiAxLjg0MjEzQzI2LjAzNyAxLjIzODQ1IDI4IDIuNjgxNjUgMjggNC43MDU1N1YxOS40MTk0QzI4IDIwLjczMTYgMjcuMTQ3MyAyMS44OTE1IDI1Ljg5NDggMjIuMjgyOUwzLjg5NDgzIDI5LjE1NzlDMS45NjMwNCAyOS43NjE2IDAgMjguMzE4MyAwIDI2LjI5NDRWMTEuNTgwNloiIGZpbGw9IiNGQ0ZDRkMiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMCAxMS43MDU2QzAgOS42ODE2NSAxLjk2MzAzIDguMjM4NDUgMy44OTQ4MiA4Ljg0MjEzTDI1Ljg5NDggMTUuNzE3MUMyNy4xNDczIDE2LjEwODUgMjggMTcuMjY4NCAyOCAxOC41ODA2VjMzLjI5NDRDMjggMzUuMzE4MyAyNi4wMzcgMzYuNzYxNiAyNC4xMDUyIDM2LjE1NzlMMi4xMDUxOCAyOS4yODI5QzAuODUyNzQ5IDI4Ljg5MTUgMCAyNy43MzE2IDAgMjYuNDE5NFYxMS43MDU2WiIgZmlsbD0iI0QyRTFEQiIvPgo8L3N2Zz4K",
};

export type LogoProps = {
  white?: boolean;
  logoWidth?: number;
};

export type LogoSignetProps = Pick<LogoProps, "logoWidth" | "white">;

export type ContainerProps = {
  children?: React.ReactNode;
} & Pick<LogoProps, "logoWidth" | "white">;

export const LogoStyledContainer = styled.div<ContainerProps>`
  @import url("https://fonts.googleapis.com/css2?family=Signika:wght@600&display=swap");
  font-family: "Signika", sans-serif;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${({ white }) => (white ? "white" : "#1E4C40")};
  /*
	temporarily adding background to white version to make it visible on white background
	*/
  background: ${({ white }) =>
    white ? ({ theme }) => theme.logo.main : "none"};
  ${({ logoWidth }) =>
    logoWidth &&
    css`
      width: ${logoWidth + "px"};
      height: ${(logoWidth * 0.27).toFixed(2) + "px"};
      font-size: ${(logoWidth / 6).toFixed(2) + "px"};
      letter-spacing: ${((logoWidth / 6) * -0.02).toFixed(2) + "px"};
    `}
`;
export const LogoSignet = styled.div<LogoSignetProps>`
  background: url(${({ white }) =>
      white ? logoVersions.whiteURL : logoVersions.colorURL})
    no-repeat center / contain;
  height: 100%;
  ${({ logoWidth }) =>
    logoWidth &&
    css`
      width: ${(logoWidth * 0.25).toFixed(2) + "px"};
    `}
`;
export const Logo = ({ white, logoWidth = 144 }: LogoProps) => {
  return (
    <LogoStyledContainer logoWidth={logoWidth} white={white}>
      <LogoSignet logoWidth={logoWidth} white={white} />
      <span>Inbudget</span>
    </LogoStyledContainer>
  );
};

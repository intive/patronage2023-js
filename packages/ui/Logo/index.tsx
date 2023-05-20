"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

const logoVersions = {
  color:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAyOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTEuNTgwNkMwIDEwLjI2ODQgMC44NTI3NDkgOS4xMDg1MiAyLjEwNTE4IDguNzE3MTNMMjQuMTA1MiAxLjg0MjEzQzI2LjAzNyAxLjIzODQ1IDI4IDIuNjgxNjUgMjggNC43MDU1N1YxOS40MTk0QzI4IDIwLjczMTYgMjcuMTQ3MyAyMS44OTE1IDI1Ljg5NDggMjIuMjgyOUwzLjg5NDgzIDI5LjE1NzlDMS45NjMwNCAyOS43NjE2IDAgMjguMzE4MyAwIDI2LjI5NDRWMTEuNTgwNloiIGZpbGw9IiM1M0E3ODUiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMCAxMS43MDU2QzAgOS42ODE2NSAxLjk2MzAzIDguMjM4NDUgMy44OTQ4MiA4Ljg0MjEzTDI1Ljg5NDggMTUuNzE3MUMyNy4xNDczIDE2LjEwODUgMjggMTcuMjY4NCAyOCAxOC41ODA2VjMzLjI5NDRDMjggMzUuMzE4MyAyNi4wMzcgMzYuNzYxNiAyNC4xMDUyIDM2LjE1NzlMMi4xMDUxOCAyOS4yODI5QzAuODUyNzQ5IDI4Ljg5MTUgMCAyNy43MzE2IDAgMjYuNDE5NFYxMS43MDU2WiIgZmlsbD0iIzgyRDNBRiIvPgo8L3N2Zz4K",
  white:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAyOCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTEuNTgwNkMwIDEwLjI2ODQgMC44NTI3NDkgOS4xMDg1MiAyLjEwNTE4IDguNzE3MTNMMjQuMTA1MiAxLjg0MjEzQzI2LjAzNyAxLjIzODQ1IDI4IDIuNjgxNjUgMjggNC43MDU1N1YxOS40MTk0QzI4IDIwLjczMTYgMjcuMTQ3MyAyMS44OTE1IDI1Ljg5NDggMjIuMjgyOUwzLjg5NDgzIDI5LjE1NzlDMS45NjMwNCAyOS43NjE2IDAgMjguMzE4MyAwIDI2LjI5NDRWMTEuNTgwNloiIGZpbGw9IiNGQ0ZDRkMiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMCAxMS43MDU2QzAgOS42ODE2NSAxLjk2MzAzIDguMjM4NDUgMy44OTQ4MiA4Ljg0MjEzTDI1Ljg5NDggMTUuNzE3MUMyNy4xNDczIDE2LjEwODUgMjggMTcuMjY4NCAyOCAxOC41ODA2VjMzLjI5NDRDMjggMzUuMzE4MyAyNi4wMzcgMzYuNzYxNiAyNC4xMDUyIDM2LjE1NzlMMi4xMDUxOCAyOS4yODI5QzAuODUyNzQ5IDI4Ljg5MTUgMCAyNy43MzE2IDAgMjYuNDE5NFYxMS43MDU2WiIgZmlsbD0iI0QyRTFEQiIvPgo8L3N2Zz4K",
};

type LogoProps = {
  white?: boolean;
  logoWidth?: number;
};

type InnerProps = {
  $white?: boolean;
  $logoWidth?: number;
};

const LogoStyledContainer = styled(Link)<InnerProps>`
  display: flex;
  font-family: "Signika", sans-serif;
  font-weight: 600;
  text-decoration: none;
  justify-content: space-around;
  align-items: center;
  color: ${({ $white, theme }) => ($white ? "white" : theme.logo.main)};

  ${({ $logoWidth }) =>
    $logoWidth &&
    css`
      width: ${$logoWidth + "px"};
      height: ${($logoWidth * 0.27).toFixed(2) + "px"};
      font-size: ${($logoWidth / 6).toFixed(2) + "px"};
      letter-spacing: ${(($logoWidth / 6) * -0.02).toFixed(2) + "px"};
    `}
`;

const LogoSignet = styled.span<InnerProps>`
  background-image: url(${({ $white }) =>
    $white ? logoVersions.white : logoVersions.color});
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  ${({ $logoWidth }) =>
    $logoWidth &&
    css`
      width: ${($logoWidth * 0.25).toFixed(2) + "px"};
    `}
`;

export const Logo = ({ white, logoWidth = 144 }: LogoProps) => {
  return (
    <LogoStyledContainer $logoWidth={logoWidth} $white={white} href="/">
      <LogoSignet $logoWidth={logoWidth} $white={white} />
      <span>Inbudget</span>
    </LogoStyledContainer>
  );
};

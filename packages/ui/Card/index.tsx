"use client";

import { ReactNode } from "react";
import styled, { css } from "styled-components";

export type CardProps = {
	children: ReactNode;
	padding?: string;
	margin?: string;
	horizontalFit?: boolean;
	verticalFit?: boolean;
};

export const Card = ({
	children,
	padding,
	margin,
	horizontalFit,
	verticalFit,
}: CardProps) => {
	return (
		<CardWrapperStyled horizontalFit={horizontalFit} verticalFit={verticalFit}>
			<CardStyled
				padding={padding}
				margin={margin}
				horizontalFit={horizontalFit}
				verticalFit={verticalFit}>
				<CardContenetStyled>{children}</CardContenetStyled>
			</CardStyled>
		</CardWrapperStyled>
	);
};

export const CardWrapperStyled = styled.div<{
	horizontalFit?: boolean;
	verticalFit?: boolean;
}>`
	display: flex;
	max-width: 100%;
	max-height: 100%;
	height: ${({ verticalFit }) => verticalFit && "100%"};
	width: ${({ horizontalFit }) => horizontalFit && "100%"};
`;

export const CardStyled = styled.div<CardProps>`
	width: ${({ horizontalFit }) => (horizontalFit ? "100%" : "fit-content")};
	height: ${({ verticalFit }) => (verticalFit ? "auto" : "fit-content")};
	padding: ${({ padding }) => (padding ? padding : "auto")};
	margin: ${({ margin }) => (margin ? margin : 0)};
	background-color: #ffffff;
	border: 1px solid #e1e1e1;
	box-shadow: 0px 2px 6px rgba(32, 41, 50, 0.1);
	border-radius: 16px;
	overflow: hidden;
`;

export const CardContenetStyled = styled.div`
	overflow: auto;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

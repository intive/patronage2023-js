"use client";

import { ReactNode } from "react";
import styled from "styled-components";

export type CardProps = {
	children: ReactNode;
	padding?: string;
	margin?: string;
};

export const Card = ({ children, padding, margin }: CardProps) => {
	return (
		<CardStyled padding={padding} margin={margin}>
			{children}
		</CardStyled>
	);
};

export const CardStyled = styled.div<CardProps>`
	display: inline-block;
	padding: ${({ padding }) => (padding ? padding : 0)};
	margin: ${({ margin }) => (margin ? margin : 0)};
	background-color: #ffffff;
	border: 1px solid #e1e1e1;
	box-shadow: 0px 2px 6px rgba(32, 41, 50, 0.1);
	border-radius: 16px;
`;

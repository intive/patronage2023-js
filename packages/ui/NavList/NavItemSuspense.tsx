"use client";

import styled from "styled-components";
import { SkeletonLoading } from "ui";

const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  flex-basis: 80%;
  min-width: 0;
`;
const NavItemStyled = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 100%;
  font-size: 15px;
  padding: 15px 10px;
  border-radius: 8px;
  font-weight: 500;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
`;

const SpanStyled = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin-left: 10px;
  height: auto;
`;

const IconStyled = styled.span`
  width: 32px;
  height: 32px;
`;

export const NavItemSuspense = () => {
  return (
    <li>
      <NavItemStyled>
        <ChildrenWrapper>
          <IconStyled>
            <SkeletonLoading width={32} height={32} />
          </IconStyled>
          <SpanStyled>
            <SkeletonLoading height={24} />
          </SpanStyled>
        </ChildrenWrapper>
      </NavItemStyled>
    </li>
  );
};

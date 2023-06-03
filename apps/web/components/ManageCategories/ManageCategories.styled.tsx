import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  height: 100%;
`;

export const CategoryRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.button`
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.primary};
  height: 3em;
  width: 3em;
  border-radius: 8px;
  flex-shrink: 0;
  line-height: 0;
`;

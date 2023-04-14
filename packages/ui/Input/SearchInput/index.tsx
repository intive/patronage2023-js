import styled from "styled-components";
import { ReactNode } from "react";

type SearchInputProps = {
  searchInput: {
    placeholder: string;
    icon: ReactNode;
  };
};

export const SearchInput = ({ searchInput }: SearchInputProps) => {
  return (
    <Wrapper>
      <StyledInput placeholder={searchInput.placeholder} />
      <StyledIcon>{searchInput.icon}</StyledIcon>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: solid 2px #e1e1e1;
  border-radius: 8px;
  padding: 8px 0px 8px 48px;
  background-color: #ffffff;
  font-family: inherit;

  &::placeholder {
    color: #b1b1b1;
  }
`;

const StyledIcon = styled.span`
  position: absolute;

  left: 18px;
  bottom: 0;
`;

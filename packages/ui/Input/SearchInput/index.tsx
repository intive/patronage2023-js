import styled from "styled-components";
import { Icon } from "../../Icon";

type SearchInputProps = {
  searchInput: any;
};

export const SearchInput = ({ searchInput }: SearchInputProps) => {
  return (
    <Wrapper>
      <StyledInput placeholder={searchInput.placeholder} />
      <StyledIcon>
        <Icon icon={searchInput.icon} color="#515151" />
      </StyledIcon>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  border: solid 2px #e1e1e1;
  border-radius: 8px;
  padding: 8px 0px 8px 48px;
  background-color: #ffffff;

  &::placeholder {
    color: #b1b1b1;
  }
`;

const StyledIcon = styled.span`
  position: absolute;

  left: 18px;
  bottom: 0;
`;

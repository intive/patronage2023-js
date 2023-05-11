import styled from "styled-components";
import { Icon } from "../../Icon";
import { StyledInputBase, StyledIcon } from "..";
import { useRef } from "react";

type SearchInputProps = {
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputCleared?: Function;
} & React.HTMLProps<HTMLInputElement>;

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled(StyledInputBase)`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 8px 0px 8px 48px;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const StyledIconSearch = styled.span`
  position: absolute;
  left: 18px;
  bottom: 3px;
  color: ${({ theme }) => theme.input.neutral};
`;

const StyledIconCancel = styled(StyledIcon)`
  position: absolute;
  top: 9px;
  right: 10px;
  color: ${({ theme }) => theme.input.main};
`;

export const SearchInput = ({
  name,
  id,
  type,
  placeholder,
  value,
  onChange,
  onInputCleared,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Wrapper>
      <StyledInput
        ref={inputRef}
        placeholder={placeholder}
        name={name}
        id={id || name}
        type={type}
        value={value}
        onChange={onChange}
        // onInputCleared={onInputCleared}
      />
      <StyledIconSearch>
        <Icon icon="search" />
      </StyledIconSearch>
      {value && onInputCleared && (
        <StyledIconCancel
          onClick={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
            onInputCleared();
          }}>
          <Icon icon="cancel" iconSize={20} />
        </StyledIconCancel>
      )}
    </Wrapper>
  );
};

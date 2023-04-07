import styled from "styled-components";
import { Avatar } from "../Avatar";
interface AvatarProps {
  src: string;
  id: string;
}

interface SelectorProps {
  avatars: AvatarProps[];
  selectedAvatar?: string;
  onSelect: (id: string) => void;
}

interface ButtonProps {
  selected: boolean;
}

export const AvatarSelector = ({
  avatars,
  onSelect,
  selectedAvatar,
}: SelectorProps) => {
  return (
    <RelativeDiv>
      <AvatarGridStyled>
        {avatars.map(({ src, id }) => (
          <ButtonStyled
            key={id}
            onClick={() => onSelect(id)}
            selected={selectedAvatar === id}>
            <Avatar src={src} />
          </ButtonStyled>
        ))}
      </AvatarGridStyled>
    </RelativeDiv>
  );
};

const AvatarGridStyled = styled.div`
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  overflow-y: hidden;
  padding: 2rem;
  gap: 1rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  @media (hover: none) {
    &::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    & {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }

  @media (max-width: 768px) {
    flex-wrap: nowrap;

    &:after,
    &:before {
      content: "";
      width: 36px;
      height: 90%;
      top: 0;
      position: absolute;
    }
    &::after {
      left: 0;
      background: linear-gradient(
        90deg,
        #ffffff 0%,
        #ffffff 33.85%,
        rgba(255, 255, 255, 0.51) 80.21%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    &::before {
      right: 0;
      background: linear-gradient(
        270deg,
        #ffffff 0%,
        #ffffff 33.85%,
        rgba(255, 255, 255, 0.51) 80.21%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

const RelativeDiv = styled.div`
  position: relative;
`;

const ButtonStyled = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  font-size: 88px;
  height: 1em;
  padding: 0;
  background: none;
  border-radius: 50%;
  outline-offset: 2px;
  outline: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.avatarSelector.active}` : "none"};

  &:hover,
  &:focus {
    outline: ${({ theme }) => `2px solid ${theme.avatarSelector.active}`};
  }

  @media (max-width: 768px) {
    font-size: 120px;
  }
`;

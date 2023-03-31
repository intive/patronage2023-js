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
    <AvatarGridStyled>
      {avatars.map(({ src, id }) => (
        <ButtonStyled
          key={id}
          onClick={() => onSelect(id)}
          selected={selectedAvatar === id}
        >
          <Avatar src={src} />
        </ButtonStyled>
      ))}
    </AvatarGridStyled>
  );
};

const AvatarGridStyled = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    background: linear-gradient(
      270deg,
      #867c7c34 0%,
      #ffffff 10%,
      #ffffff 90%,
      #867c7c34 100%
    );
  }
`;

const ButtonStyled = styled.button<ButtonProps>`
  user-select: none;
  cursor: pointer;
  border: none;
  font-size: 88px;
  height: 1em;
  padding: 0;
  background: none;
  border-radius: 50%;
  outline-offset: 2px;
  outline: ${({ selected }) => (selected ? "2px solid #000" : "none")};
  &:hover {
    outline: 2px solid #000;
  }
`;

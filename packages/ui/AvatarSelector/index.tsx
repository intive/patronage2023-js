import styled from "styled-components";
import { Avatar } from "../Avatar";
import { device } from "../../../apps/web/lib/media-queries";

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
    <AvatarsWrapper>
      <AvatarGridStyled>
        {avatars.map(({ src, id }) => (
          <ButtonStyled
            key={id}
            onClick={(e) => {
              e.preventDefault();
              onSelect(id);
            }}
            selected={selectedAvatar === id}>
            <Avatar src={src} />
          </ButtonStyled>
        ))}
      </AvatarGridStyled>
    </AvatarsWrapper>
  );
};

const AvatarsWrapper = styled.div`
  position: relative;
  width: 348px;
  margin-left: -1em;
  margin-right: -1em;
  margin-bottom: 2em;

  ${device.tablet} {
    width: 100%;
    max-width: 480px;
    min-width: 310px;
    margin: 0;
    margin-bottom: 2em;
  }
`;

const AvatarGridStyled = styled.div`
  overflow-x: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: hidden;
  padding: 0.5rem;
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

  @media (max-width: 767px) {
    flex-wrap: nowrap;
    justify-content: flex-start;

    &:after,
    &:before {
      content: "";
      width: 36px;
      height: 88%;
      top: 0;
      position: absolute;

      @media (hover: none) {
        height: 100%;
      }
    }

    &::after {
      left: -5px;
      background: linear-gradient(
        90deg,
        #ffffff 0%,
        #ffffff 35%,
        rgba(255, 255, 255, 0.41) 75%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    &::before {
      right: -5px;
      background: linear-gradient(
        270deg,
        #ffffff 0%,
        #ffffff 35%,
        rgba(255, 255, 255, 0.41) 75%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

const ButtonStyled = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  font-size: 110px;
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

  &:first-child {
    margin-left: 14px;
  }

  &:last-child {
    margin-right: 14px;
  }

  ${device.tablet} {
    font-size: 88px;

    &:first-child,
    &:last-child {
      margin: 0;
    }
  }
`;

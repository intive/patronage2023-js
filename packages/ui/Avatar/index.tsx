import styled, { css } from "styled-components";

export type AvatarProps = {
  username?: string;
  src: string;
  alt?: string;
  hasOutline?: boolean;
  className?: string;
};

export const Avatar = ({
  username = "user",
  src,
  alt,
  className,
  hasOutline,
}: AvatarProps) => {
  return (
    <Image
      src={src}
      alt={alt ? alt : `${username}'s avatar`}
      className={className}
      hasOutline={hasOutline}
    />
  );
};

const Image = styled.img<AvatarProps>`
  height: 1em;
  width: 1em;
  border-radius: 50%;
  object-fit: cover;

  ${({ hasOutline }) =>
    hasOutline &&
    css`
      border: 2px solid white;
    `}
`;

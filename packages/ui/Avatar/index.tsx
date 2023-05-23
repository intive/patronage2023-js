import { forwardRef } from "react";
import styled, { css } from "styled-components";

export type AvatarProps = {
  username?: string;
  src: string;
  alt?: string;
  outlined?: boolean;
  className?: string;
  title?: string;
};

const Image = styled.img<AvatarProps>`
  height: 1em;
  width: 1em;
  border-radius: 50%;
  object-fit: cover;

  ${({ outlined }) =>
    outlined &&
    css`
      border: 2px solid ${({ theme }) => theme.avatar.outline};
    `}
`;

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    { username = "user", src, alt, className, outlined, title }: AvatarProps,
    ref
  ) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt ? alt : `${username}'s avatar`}
        className={className}
        outlined={outlined}
        title={title}
      />
    );
  }
);

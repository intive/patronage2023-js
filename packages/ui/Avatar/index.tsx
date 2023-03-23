import styled from "styled-components";

export type AvatarProps = {
  className?: string;
  username: string;
  src: string;
};

export const Avatar = ({ username, src, className }: AvatarProps) => {
  return <Image src={src} alt={`${username}'s avatar`} className={className} />;
};

const Image = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
`;

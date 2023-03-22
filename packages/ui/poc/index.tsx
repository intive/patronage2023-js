import React from "react";
import Image from "next/image";
import styled from "styled-components";
export const Prove = ({ src, alt, width, height }: Props) => {
  return (
    <Avatar height={height} width={width}>
      <Image src={src} alt={alt || ""} fill sizes="100%" />
    </Avatar>
  );
};

interface Props {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

export type ProveProps = {
  width: number;
  height: number;
} & React.HTMLProps<HTMLDivElement>;

export const Avatar = styled.div<ProveProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

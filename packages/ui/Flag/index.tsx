import styled from "styled-components";

type FlagProps = {
  src: string;
};

const ImgStyled = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Flag = ({ src }: FlagProps) => {
  return <ImgStyled src={src} alt="" />;
};

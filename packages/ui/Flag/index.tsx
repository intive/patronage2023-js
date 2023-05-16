import styled from "styled-components";

type FlagProps = {
  src: string;
};

const ImgStyled = styled.img`
  width: 2.3rem;
  height: 1.5rem;
  border-radius: 4px;
`;

export const Flag = ({ src }: FlagProps) => {
  return <ImgStyled src={src} alt="" />;
};

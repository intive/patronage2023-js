import styled from "styled-components";

type FlagProps = {
  src: string;
};

const ImgStyled = styled.img`
  width: 2.3rem;
  height: 1.5rem;
  border-radius: 4px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
`;

export const Flag = ({ src }: FlagProps) => {
  return <ImgStyled src={src} alt="" />;
};

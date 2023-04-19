import styled from "styled-components";

const InfoTileStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.infoTile.border};
  color: ${({ theme }) => theme.infoTile.label};
  padding: 16px 32px 16px 16px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
`;

const InfoValueWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const InfoValueStyled = styled.span`
  color: ${({ theme }) => theme.infoTile.value};
  font-family: "Signika", sans-serif;
  font-weight: 600;
  font-size: 16px;
`;

const AddInfoValueStyled = styled.span`
  color: ${({ theme }) => theme.infoTile.value};
  font-family: "Signika", sans-serif;
  font-weight: 400;
  font-size: 16px;
`;

type InfoTileProps = {
  label: string;
  value: string | { [ key: string ]: string };
};

export const InfoTile = ({ label, value }: InfoTileProps) => {

  if (typeof value === "object") {
    return (
      <InfoTileStyled>
        <div>{label}</div>
        <InfoValueWrapper>
          <InfoValueStyled>{Object.values(value)[0]}</InfoValueStyled>
          <AddInfoValueStyled>{Object.values(value)[1]}</AddInfoValueStyled>
        </InfoValueWrapper>
      </InfoTileStyled>
    );
  }

  return (
    <InfoTileStyled>
      {label}
      <InfoValueStyled>{value}</InfoValueStyled>
    </InfoTileStyled>
  );
};

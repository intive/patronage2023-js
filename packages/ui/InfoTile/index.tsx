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
  font-family: "Signika", sans-serif;
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.infoTile.value};
  font-size: 16px;
  font-weight: 600;
`;

const AddInfoValueStyled = styled.span`
  font-weight: 400;
`;

type InfoTileProps = {
  label: string;
  value: string | { symbol: string; description: string };
};

export const InfoTile = ({ label, value }: InfoTileProps) => {
  if (typeof value === "object") {
    return (
      <InfoTileStyled>
        {label}
        <InfoValueWrapper>
          {value.symbol}
          <AddInfoValueStyled>{value.description}</AddInfoValueStyled>
        </InfoValueWrapper>
      </InfoTileStyled>
    );
  }

  return (
    <InfoTileStyled>
      {label}
      <InfoValueWrapper>{value}</InfoValueWrapper>
    </InfoTileStyled>
  );
};

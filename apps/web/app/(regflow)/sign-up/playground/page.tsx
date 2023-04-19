"use client";

import { PasswordSubComponent } from "../PasswordSubComponent";
import { InfoTile } from "ui";
import styled, { css } from "styled-components";

const DUMMY_DATA = {
  1: {
    label: "Budget period",
    value: "Jan 1 - Jan 31"
  },
  2: {
    label: "Budget limit",
    value: "$ 10,000.00",
  },
  3: {
    label: "Currency",
    value: {
      symbol: "USD",
      description: "United States Dollar"
    }
  }
}

const TileListStyled = styled.div`
  display: flex;
  gap: 10px;
`;

const TileList = () => {

  return (
    <TileListStyled>
      {Object.values(DUMMY_DATA).map( el => <InfoTile key={el.label} label={el.label} value={el.value} />)}
    </TileListStyled>
  )
}

//TODO delete this page before merge
export default function PasswordPlayground() {
  return (
    <>
      {/* <PasswordSubComponent
        onNext={(text) => console.log(text)}
        onBack={() => console.log("Back")}
      /> */}
      <TileList />
    </>
  );
}

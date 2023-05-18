"use client";

import { InfoTile, Icon, Avatar } from "ui";
import { StyledAddInfoSpan } from "ui/InfoTile";
import styled from "styled-components";

const DUMMY_DATA = [
  {
    dataToRender: "Jan 1 - Jan 31",
    label: "Budget period",
    id: 1,
  },
  {
    dataToRender: (
      <>
        <span>$ 10,000.00</span>
      </>
    ),
    label: "Budget limit",
    id: 2,
  },
  {
    dataToRender: (
      <>
        <span>USD</span>
        <StyledAddInfoSpan>United States Dollar</StyledAddInfoSpan>
      </>
    ),
    label: "Currency",
    id: 3,
  },
  {
    dataToRender: (
      <>
        <Icon icon="subscriptions" />
      </>
    ),
    label: "Some icon",
    id: 4,
  },
  {
    dataToRender: (
      <>
        <div style={{ fontSize: "24px" }}>
          <Avatar src="/avatars/1.svg" />
        </div>
      </>
    ),
    label: "Some avatar",
    id: 5,
  },
];

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function Playground() {
  return (
    <>
      <h1>Hello World</h1>
      <Wrapper>
        <InfoTile
          label={DUMMY_DATA[3].label}
          dataToRender={DUMMY_DATA[3].dataToRender}
        />
        <InfoTile
          label={DUMMY_DATA[2].label}
          dataToRender={DUMMY_DATA[2].dataToRender}
        />
      </Wrapper>
    </>
  );
}

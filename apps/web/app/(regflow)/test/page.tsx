"use client";

import { CustomDatePicker } from "ui";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function TestPage() {
  return (
    <FormWrapper style={{ minWidth: "314px" }}>
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>datepicker</h2>
      <form style={{ minHeight: "500px" }}>
        <Line>
          <CustomDatePicker placeholder="Start date" />
        </Line>
      </form>
    </FormWrapper>
  );
}

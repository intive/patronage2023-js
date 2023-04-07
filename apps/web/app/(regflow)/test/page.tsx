"use client";

import { CustomDatePicker } from "ui";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useState } from "react";

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
  gap: 10px;
  align-items: center;
`;

export default function TestPage() {
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);

  const onSelectStartDate = (date: Date) => {
    date ? setStartDate(date.getTime()) : setStartDate(null)
  };

  const onSelectEndDate = (date: Date) => {
    date ? setEndDate(date.getTime()): setEndDate(null)
  };

  return (
    <FormWrapper style={{ minWidth: "314px" }}>
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
        Intorducing DatePicker
      </h2>
      <form style={{ minHeight: "500px" }}>
        <Line>
          {/* usage */}
          <CustomDatePicker
            placeholder="Start date"
            onSelect={(date) => onSelectStartDate(date)}
          />
          {/* usage */}
          <p> to </p>
          <CustomDatePicker placeholder="End date" onSelect={(date)=> onSelectEndDate(date)} />
        </Line>
        <Line style={{ marginTop: "50px" }}>
          <div>StartDate: {startDate ? startDate :  "unset"}</div>
        </Line>
        <Line>
          <div>EndDate: {endDate ? endDate: "unset"}</div>
        </Line>
      </form>
    </FormWrapper>
  );
}

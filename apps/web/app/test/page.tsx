"use client";

import { Card, Icon } from "ui";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled, { ThemeContext } from "styled-components";

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const DatePickerStyled = styled.div`
  position: relative;

  .react-datepicker__input-container input {
    position: relative;
    width: 100%;
    border: solid 2px ${({ theme }) => theme.input.borderError};
    border-radius: 8px;
    padding: 14px 0 14px 14px;
    font-size: 16px;
    line-height: 150%;
    caret-color: ${({ theme }) => theme.input.neutral};
    transition: border-color 200ms ease-out;
    width: 100%;
    color: #515151;
    :focus {
      outline: none;
      border-color: ${({ theme }) => theme.input.focus};
    }
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  line-height: 0;
`;

export default function TestPage() {
  const theme = useContext(ThemeContext);
  const [date, setDate] = useState<Date | null>(null);

  console.log(date);

  return (
    <CardStyled>
      <br />
      <br />
      <p>datepicker</p>
      <br />
      <br />

      <form style={{ width: "300px" }}>
        <DatePickerStyled>
          <DatePicker
            name="date"
            selected={date}
            onChange={(date: Date) => {
              setDate(date);
            }}
            placeholderText="Start Date"
          />
          <StyledIcon>
            <Icon icon={"event"} color={theme.input.neutral} />
          </StyledIcon>
        </DatePickerStyled>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </CardStyled>
  );
}

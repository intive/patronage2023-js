"use client";

import { Button, Icon } from "ui";
import { useContext, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled, { ThemeContext } from "styled-components";
import { device } from "lib/css-variables";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const DatePickerStyled = styled.div`
  position: relative;

  .react-datepicker__input-container input {
    font-family: unset;
    position: relative;
    border: solid 2px ${({ theme }) => theme.input.borderError};
    border-radius: 8px;
    padding: 14px 0 14px 14px;
    font-size: 16px;
    line-height: 1.5rem;
    caret-color: ${({ theme }) => theme.input.neutral};
    transition: border-color 200ms ease-out;
    color: #515151;
    width: 100%;
    :focus {
      outline: none;
      border-color: ${({ theme }) => theme.input.focus};
    }
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker {
    font-family: unset;
    border: 0;
    background-color: #f1fbf6;
    border-radius: 1rem;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
      0px 2px 4px rgba(32, 37, 50, 0.03);
  }

  .react-datepicker__month-container {
    border-radius: 1rem;
  }

  .react-datepicker__header {
    background-color: unset;
    border-bottom: 1px solid #e1e1e1;
  }

  .react-datepicker__navigation--next {
    top: 10px;
    right: 10px;
    :hover {
      & span::before {
        border-color: #1e4c40;
      }
    }
  }

  .react-datepicker__navigation--previous {
    top: 10px;
    left: 10px;
    :hover {
      & span::before {
        border-color: #1e4c40;
      }
    }
  }

  .react-datepicker__navigation-icon::before,
  .react-datepicker__navigation-icon::after,
  .react-datepicker__year-read-view--down-arrow {
    border-color: #52a785;
  }

  .react-datepicker__year-dropdown-container {
    line-height: 2.5rem;
  }

  .react-datepicker__year-read-view--down-arrow {
    right: -24px;
    top: 12px;
  }

  .react-datepicker__year-read-view:hover {
    & span {
      border-color: #1e4c40;
    }
  }

  .react-datepicker__current-month {
    line-height: 2.5rem;
    color: #222222;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    color: #222222;
    width: 2.35rem;
    line-height: 2.35rem;

    @media ${device.desktop} {
      font-size: 1rem;
      width: 2.5rem;
      line-height: 2.5rem;
    }
  }

  .react-datepicker__day--selected {
    color: white;
    border-radius: 50%;
    background-color: #1e4c40;
    :hover {
      color: #222222;
    }
  }

  .react-datepicker__day:hover {
    border-radius: 50%;
    background-color: #d0f5e3;
  }

  .react-datepicker__day--disabled:hover {
    bacground-color: unset;
  }

  .react-datepicker__day--disabled {
    color: #9e9e9e;
    cursor: not-allowed;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #a3eac9;
    border-radius: 50%;
  }

  .react-datepicker__day--outside-month {
    font-size: 0.7rem;
    color: #9e9e9e;
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

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function TestPage() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <FormWrapper style={{ minWidth: "314px" }}>
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>datepicker</h2>
      <form style={{ minHeight: "640px" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Line>
          <DatePickerStyled>
            <DatePicker
              withPortal
              name="date"
              selected={date}
              onChange={(date: Date) => {
                setDate(date);
              }}
              placeholderText="Start Date"
              maxDate={new Date()}
              yearDropdownItemNumber={3}
              showYearDropdown></DatePicker>
            <StyledIcon>
              <Icon icon={"event"} color={theme.input.neutral} />
            </StyledIcon>
          </DatePickerStyled>
        </Line>
      </form>
    </FormWrapper>
  );
}
